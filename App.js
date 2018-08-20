import React from 'react'
import { StatusBar, View, Text, TextInput } from 'react-native'
import { inject, observer, Provider } from 'mobx-react'

import AppModel from './models/models.js'
import MangaList from './components/mangaList.js'
import PageList from './components/pageList.js'
import ChapterList from './components/chapterList.js'

import styles from './AppStyles.js'

@inject(({appStore}) => ({appStore}))
@observer
class MainView extends React.Component {
  componentWillMount () {
    this.props.appStore.refresh()
  }

  render () {
    const { searchedMangas, submitQuery, latestMangas, refreshing, refresh,
      loadMore, selectedManga } = this.props.appStore

    return <View style={styles.base}>
      <StatusBar hidden />
      <TextInput style={styles.text} placeholder='Search...'
        placeholderTextColor={styles.text.color} onChangeText={submitQuery} />
      <MangaList mangas={searchedMangas} onSelect={this.selectManga} />

      <Text style={styles.text}>Latest</Text>
      <MangaList mangas={latestMangas} onSelect={this.selectManga}
        refreshing={refreshing} onRefresh={refresh} onEndReached={loadMore} />

      {selectedManga && <ChapterList />}

      {selectedManga && selectedManga.selectedChapter && <PageList />}
    </View>
  }

  selectManga = (manga) => () => {
    this.props.appStore.selectManga(manga)
  }
}

const appStore = AppModel.create()

const App = () => (
  <Provider appStore={appStore}>
    <MainView />
  </Provider>
)

export default App
