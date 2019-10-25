import { types, flow } from 'mobx-state-tree'

import { getLatest, getSearch, getChapters, getPages } from './api.js'
import { nextDay } from '../utils/dateHelpers.js'

const AppModel = types.model('App', {
  isHorizontal: true,
  latestPageNum: 1,
  refreshing: false,
  mangas: types.map(types.late(() => Manga)),
  latest: types.array(types.reference(types.late(() => Manga))),
  favorites: types.array(types.reference(types.late(() => Manga))),
  searched: types.array(types.reference(types.late(() => Manga))),
  selectedManga: types.maybe(types.reference(types.late(() => Manga))),
  selectedChapter: types.maybe(types.reference(types.late(() => Chapter)))
}).views((self) => ({
  get isSelectedFavorite () {
    return self.favorites.includes(self.selectedManga)
  }
})).actions((self) => {
  function addMangas (mangas) {
    mangas.forEach(manga => self.mangas.put(manga))
  }

  function mangasToRefs (mangas) {
    return mangas.map(({link}) => link)
  }

  return {toggleHorizontal () {
    self.isHorizontal = !self.isHorizontal
  },

  refresh: flow(function * refresh () {
    self.latestPageNum = 1
    self.refreshing = true
    const newMangas = yield getLatest(1)
    addMangas(newMangas)
    self.latest = mangasToRefs(newMangas)
    self.refreshing = false
  }),

  loadMore: flow(function * loadMore () {
    self.latestPageNum += 1
    self.refreshing = true
    const moreMangas = yield getLatest(self.latestPageNum)
    addMangas(moreMangas)
    self.latest.push(...mangasToRefs(moreMangas))
    self.refreshing = false
  }),

  submitQuery: flow(function * submitQuery (query) {
    // empty results if empty query
    if (!query) {
      self.searched = []
      return
    }
    const searched = yield getSearch(query)
    addMangas(searched)
    self.searched = mangasToRefs(searched)
  }),

  selectManga (manga) {
    self.selectedManga = manga.link
  },

  deselectManga () {
    self.selectedManga = undefined
  },

  selectChapter (chapter) {
    self.selectedChapter = chapter.link
  },

  deselectChapter () {
    self.selectedChapter = undefined
  },

  addFavorite () {
    self.favorites.push(self.selectedManga)
  },

  removeFavorite () {
    self.favorites.splice(self.favorites.findIndex((elem) => {
      return elem === self.selectedManga
    }), 1)
  }}
})

const Manga = types.model('Manga', {
  link: types.identifier,
  cover: types.string,
  title: types.string,
  release: types.maybe(types.string),
  chapters: types.array(types.late(() => Chapter)),
  tags: types.array(types.string),
  summary: ''
}).actions((self) => ({
  loadChapters: flow(function * loadChapters () {
    const { chapters, tags, summary } = yield getChapters(self.link)
    if (self.chapters.length === 0) {
      self.chapters = chapters // just an optimization compared to below
    } else {
      // merge chapter data if some already persisted
      chapters.forEach((chapter, index) => {
        self.chapters[index] = { ...self.chapters[index], ...chapter }
      })
    }
    self.tags = tags
    self.summary = summary
  })
}))

const Chapter = types.model('Chapter', {
  link: types.identifier,
  title: types.string,
  date: types.maybeNull(types.Date), // can be non-existent or invalid
  read: false,
  pages: types.array(types.late(() => Page))
}).views((self) => ({
  isNew () {
    // less than a week old
    return self.date && self.date > nextDay(new Date(), -7)
  }
})).actions((self) => ({
  loadPages: flow(function * loadPages () {
    self.pages = yield getPages(self.link)
    self.read = true
  })
}))

const Page = types.model('Page', {
  link: types.string
})

export default AppModel
