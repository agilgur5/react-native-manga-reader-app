import React from 'react'
import { StatusBar, View, Text, TextInput } from 'react-native'
import { inject, observer } from 'mobx-react'

import MangaList from './mangaList.js'
import PageList from './pageList.js'
import ChapterList from './chapterList.js'

import styles from './mainViewStyles.js'

@inject(({appStore}) => ({appStore}))
@observer
export default class MainView extends React.Component {
  componentWillMount () {
    this.props.appStore.refresh()
  }

  render () {
    const { searched, selectManga, submitQuery, favorites, latest, refreshing,
      refresh, loadMore, selectedManga, selectedChapter } = this.props.appStore

    return <View style={styles.base}>
      <StatusBar hidden />
      <TextInput style={styles.text} placeholder='Search...'
        placeholderTextColor={styles.text.color} onChangeText={submitQuery} />
      <MangaList mangas={searched} onSelect={selectManga} />

      <Text style={styles.text}>Favorites</Text>
      <MangaList mangas={favorites} onSelect={selectManga} />

      <Text style={styles.text}>Latest</Text>
      <MangaList mangas={latest} onSelect={selectManga} refreshing={refreshing}
        onRefresh={refresh} onEndReached={loadMore} />

      {selectedManga && <ChapterList />}

      {selectedChapter && <PageList />}
    </View>
  }
}
