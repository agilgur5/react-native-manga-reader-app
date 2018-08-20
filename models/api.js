import cheerio from 'cheerio-without-node-native'

// some obfuscation
import drivers from './scraperDrivers/allDrivers.js'
const driver = drivers[Object.keys(drivers)[0]] // TODO: make this customizable

export function getSearch (query) {
  const encoded = window.encodeURIComponent(query)
  return window.fetch(driver.searchURL + encoded)
    .then((response) => response.text())
    .then((text) => cheerio.load(text))
    .then(driver.getSearch)
}

export function getLatest (page) {
  return window.fetch(driver.latestURL + page)
    .then((response) => response.text())
    .then((text) => cheerio.load(text))
    .then(driver.getLatest)
}

export function getChapters (url) {
  return window.fetch(url)
    .catch((error) => window.alert(error.message))
    .then((response) => response.text())
    .then((text) => cheerio.load(text))
    .then(driver.getChapters)
}

export function getPages (url) {
  return window.fetch(url)
    .catch((error) => window.alert(error.message))
    .then((response) => response.text())
    .then((text) => cheerio.load(text))
    .then(driver.getPages)
}

export function getImage (url) {
  return window.fetch(url)
    .catch((error) => window.alert(error.message))
    .then((response) => response.text())
    .then((text) => cheerio.load(text))
    .then(driver.getImage)
}
