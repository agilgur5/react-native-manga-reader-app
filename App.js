import React from 'react'
import { getLatest, getSearch } from './utils/api.js'

import { StatusBar, View, Text, TextInput } from 'react-native'

import MangaList from './components/mangaList.js'
import PageList from './components/pageList.js'
import ChapterList from './components/chapterList.js'

import styles from './AppStyles.js'

class App extends React.PureComponent {
  state = {
    refreshing: false,
    manga: null,
    chapter: null,
    mangas: [],
    searchedMangas: [],
    chapters: [],
    tags: [],
    summary: null,
    pages: [],
    isHorizontal: true
  }
  // not used in the UI
  _page = 1

  componentWillMount () {
    this.refresh()
  }

  render () {
    const { refreshing, manga, chapter, mangas, searchedMangas, chapters, tags,
      summary, pages, isHorizontal } = this.state

    return <View style={styles.base}>
      <StatusBar hidden />
      <TextInput style={styles.text} placeholder='Search...'
        placeholderTextColor={styles.text.color}
        onChangeText={this.submitQuery} />
      <MangaList mangas={searchedMangas} onSelect={this.selectManga} />

      <Text style={styles.text}>Latest</Text>
      <MangaList refreshing={refreshing} mangas={mangas}
        onRefresh={this.refresh} onEndReached={this.loadMore}
        onSelect={this.selectManga} />

      {manga && <ChapterList manga={manga} chapters={chapters} tags={tags}
        summary={summary} onClose={this.deselectManga}
        onSelect={this.selectChapter} onLoad={this.handleLoadedChapters} />
      }

      {chapter && <PageList chapter={chapter} pages={pages}
        isHorizontal={isHorizontal} toggleHorizontal={this.toggleHorizontal}
        onClose={this.deselectChapter} onLoad={this.handleLoadedPages} />
      }
    </View>
  }

  refresh = () => {
    this._page = 1
    this.setState({refreshing: true})
    getLatest(1).then((mangas) => {
      this.setState({mangas, refreshing: false})
    })
  }

  loadMore = () => {
    this._page += 1
    this.setState({refreshing: true})
    getLatest(this._page).then((newMangas) => {
      this.setState(({currMangas}) => ({
        mangas: [ ...currMangas, ...newMangas ],
        refreshing: false
      }))
    })
  }

  handleLoadedChapters = ({ chapters, tags, summary }) => this.setState({ chapters, tags, summary })
  handleLoadedPages = (pages) => this.setState({ pages })
  selectManga = (manga) => () => this.setState({ manga })
  deselectManga = () => this.setState({manga: null, chapters: [], tags: [], summary: null})
  selectChapter = (chapter) => () => this.setState({ chapter })
  deselectChapter = () => this.setState({chapter: null, pages: []})
  toggleHorizontal = () => {
    this.setState(({ isHorizontal }) => ({isHorizontal: !isHorizontal}))
  }
  submitQuery = (query) => {
    // empty results if empty query
    if (!query) {
      this.setState({searchedMangas: []})
      return
    }
    getSearch(query).then((searchedMangas) => this.setState({searchedMangas}))
  }
}

export default App
