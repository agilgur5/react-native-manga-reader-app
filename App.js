import React from 'react'
import { getLatest } from './utils/api.js'

import { Dimensions, StatusBar, View } from 'react-native'

import MangaList from './components/manga.js'
import Pages from './components/pages.js'
import Chapters from './components/chapters.js'

const dimensions = Dimensions.get('window')
const columns = dimensions.width < 512 ? 3 : 4

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
    direction: 'horizontal'
  }

  componentWillMount () {
    this.handleRefresh()
  }

  render () {
    const { refreshing, manga, chapter, mangas, chapters, tags, summary, pages, direction } = this.state
    return <View style={styles.base}>
      <StatusBar hidden />
      <MangaList refreshing={refreshing} mangas={mangas}
        onRefresh={this.handleRefresh} onEndReached={this.handleLoadMore}
        onSelect={this.handleSelectManga} />

      {manga && <Chapters manga={manga} chapters={chapters} tags={tags}
        summary={summary} onClose={this.handleDeselectManga}
        onSelect={this.handleSelectChapter}
        onLoad={this.handleLoadedChapters} />
      }

      {chapter && <Pages chapter={chapter} pages={pages} direction={direction}
        onClose={this.handleDeselectChapter} onLoad={this.handleLoadedPages}
        onToggle={this.handleToggleDirection} />
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
  handleToggleDirection = () => this.setState({ direction: this.state.direction === 'horizontal' ? 'vertical' : 'horizontal' })
}

export default App
