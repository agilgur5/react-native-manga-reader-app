import React from 'react'
import { StatusBar, View, Text, TextInput, SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'
import debounce from 'lodash.debounce'

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

  keyExtractor = (_, index) => index
  renderSectionHeader = ({ section }) => {
    switch (section.title) {
      case 'Search...':
        return <TextInput style={styles.text} placeholder='Search...'
          placeholderTextColor={styles.text.color} autoCorrect={false}
          {...section.props} />
      case 'Favorites':
        return <Text style={styles.text}>Favorites</Text>
      case 'Latest':
        return <Text style={styles.text}>Latest</Text>
    }
  }
  renderList = ({ item }) => {
    return <MangaList {...item} />
  }

  render () {
    const { searched, selectManga, submitQuery, favorites, latest, refreshing,
      refresh, loadMore, selectedManga, selectedChapter } = this.props.appStore

    return <View style={styles.base}>
      <StatusBar hidden />
      <SectionList
        sections={[
          {
            title: 'Search...',
            props: { onChangeText: debounce(submitQuery, 200) },
            data: [{ mangas: searched, onSelect: selectManga }]
          },
          {
            title: 'Favorites',
            data: [{ mangas: favorites, onSelect: selectManga }]
          },
          {
            title: 'Latest',
            data: [{
              mangas: latest,
              onSelect: selectManga,
              refreshing,
              onRefresh: refresh,
              onEndReached: loadMore
            }]
          }
        ]}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderList}
        renderSectionHeader={this.renderSectionHeader}
      />

      {selectedManga && <ChapterList />}

      {selectedChapter && <PageList />}
    </View>
  }
}
