import React from 'react'
import { getLatest } from './utils/api.js'

import { StatusBar, View } from 'react-native'

import MangaList from './components/mangaList.js'
import PageList from './components/pageList.js'
import ChapterList from './components/chapterList.js'

const styles = {
  base: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a'
  }
}

class App extends React.PureComponent {
  state = {
    refreshing: false,
    page: 1,
    manga: null,
    chapter: null,
    mangas: [],
    chapters: [],
    tags: [],
    summary: null,
    pages: [],
    isHorizontal: true
  }

  componentWillMount () {
    this.handleRefresh()
  }

  render () {
    const { refreshing, manga, chapter, mangas, chapters, tags, summary, pages,
      isHorizontal } = this.state

    return <View style={styles.base}>
      <StatusBar hidden />
      <MangaList refreshing={refreshing} mangas={mangas}
        onRefresh={this.handleRefresh} onEndReached={this.handleLoadMore}
        onSelect={this.handleSelectManga} />

      {manga && <ChapterList manga={manga} chapters={chapters} tags={tags}
        summary={summary} onClose={this.handleDeselectManga}
        onSelect={this.handleSelectChapter}
        onLoad={this.handleLoadedChapters} />
      }

      {chapter && <PageList chapter={chapter} pages={pages}
        isHorizontal={isHorizontal} toggleHorizontal={this.toggleHorizontal}
        onClose={this.handleDeselectChapter} onLoad={this.handleLoadedPages} />
      }
    </View>
  }

  handleRefresh = () => {
    this.setState({page: 1, refreshing: true}, () =>
      getLatest(this.state.page).then((mangas) => {
        this.setState({mangas, refreshing: false})
      })
    )
  }

  handleLoadMore = () => {
    this.setState({page: ++this.state.page, refreshing: true}, () =>
      getLatest(this.state.page).then((mangas) => {
        this.setState({
          mangas: [ ...this.state.mangas, ...mangas ],
          refreshing: false
        })
      })
    )
  }

  handleLoadedChapters = ({ chapters, tags, summary }) => this.setState({ chapters, tags, summary })
  handleLoadedPages = (pages) => this.setState({ pages })
  handleSelectManga = (manga) => () => this.setState({ manga })
  handleDeselectManga = () => this.setState({manga: null, chapters: [], tags: [], summary: null})
  handleSelectChapter = (chapter) => () => this.setState({ chapter })
  handleDeselectChapter = () => this.setState({chapter: null, pages: []})
  toggleHorizontal = () => {
    this.setState(({ isHorizontal }) => ({isHorizontal: !isHorizontal}))
  }
}

export default App
