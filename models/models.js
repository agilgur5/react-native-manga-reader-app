import { types, flow } from 'mobx-state-tree'

import { getLatest, getSearch, getChapters, getPages } from './api.js'

const AppModel = types.model('App', {
  isHorizontal: true,
  latestPageNum: 1,
  refreshing: false,
  latestMangas: types.array(types.late(() => Manga)),
  favoriteMangas: types.array(types.reference(types.late(() => Manga))),
  searchedMangas: types.array(types.late(() => Manga)),
  selectedManga: types.maybe(types.reference(types.late(() => Manga))),
  selectedChapter: types.maybe(types.reference(types.late(() => Chapter)))
}).views((self) => ({
  get isSelectedFavorite () {
    return self.favoriteMangas.includes(self.selectedManga)
  }
})).actions((self) => ({
  toggleHorizontal () {
    self.isHorizontal = !self.isHorizontal
  },

  refresh: flow(function * refresh () {
    self.latestPageNum = 1
    self.refreshing = true
    self.latestMangas = yield getLatest(1)
    self.refreshing = false
  }),

  loadMore: flow(function * loadMore () {
    self.latestPageNum += 1
    self.refreshing = true
    self.latestMangas.push(...yield getLatest(self.latestPageNum))
    self.refreshing = false
  }),

  submitQuery: flow(function * submitQuery (query) {
    // empty results if empty query
    if (!query) {
      self.searchedMangas = []
      return
    }
    self.searchedMangas = yield getSearch(query)
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
    self.favoriteMangas.push(self.selectedManga)
  },

  removeFavorite () {
    self.favoriteMangas.splice(self.favoriteMangas.findIndex((elem) => {
      return elem === self.selectedManga
    }), 1)
  }
}))

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
    self.chapters = chapters
    self.tags = tags
    self.summary = summary
  })
}))

const Chapter = types.model('Chapter', {
  link: types.identifier,
  title: types.string,
  pages: types.array(types.late(() => Page))
}).actions((self) => ({
  loadPages: flow(function * loadPages () {
    self.pages = yield getPages(self.link)
  })
}))

const Page = types.model('Page', {
  link: types.string
})

export default AppModel
