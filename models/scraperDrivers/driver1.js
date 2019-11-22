export { searchURL, latestURL } from './driver1URLs.js'

export function getSearch ($) {
  return $('.post-list li')
    .map((index, el) => ({
      link: $(el).find('a').attr('href'),
      title: $(el).find('img').attr('title'),
      cover: $(el).find('img').attr('src')
    }))
    .get()
}

export function getLatest ($) {
  return $('.post')
    .map((index, el) => ({
      link: $(el).find('a').attr('href'),
      title: $(el).find('img').attr('title'),
      cover: $(el).find('img').attr('src'),
      release: $(el).find('em').text()
    }))
    .get()
}

export function getChapters ($) {
  const title = $('.manga-detail-top .title').text().trim()
  const chapters = $('.chlist a')
    .map((index, el) => {
      const dateText = $(el).find(':not(.newch)').text()
      // if "hours ago". "days ago", "Today", etc, just use now
      const isRelative = dateText.includes('ago') ||
        dateText.includes('Today') ||
        dateText.includes('Yesterday')
      const date = new Date(isRelative ? Date.now() : dateText)

      return {
        link: $(el).attr('href').replace('//', 'http://'),
        title: $(el).text().match(/[0-9]+/)[0] || '0',
        date
      }
    })
    .get()
  const tags = $('.manga-genres li')
    .map((index, el) => $(el).text().trim())
    .get()
  const summary = $('.manga-summary').text().trim()
  return { title, chapters, tags, summary }
}

export function getPages ($) {
  return $('.mangaread-page option')
    .map((index, el) => ({
      link: $(el).attr('value').replace('//', 'http://')
    }))
    .get()
}

export function getImage ($) {
  return $('#viewer img').attr('src')
}
