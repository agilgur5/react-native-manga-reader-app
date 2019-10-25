import React from 'react'
import { FlatList, ScrollView, View, Text, Image, Button,
  TouchableWithoutFeedback } from 'react-native'
import { inject, observer } from 'mobx-react'

import styles from './chapterStyles.js'

@inject(({appStore}) => ({
  manga: appStore.selectedManga,
  onClose: appStore.deselectManga,
  isFavorite: appStore.isSelectedFavorite,
  addFavorite: appStore.addFavorite,
  removeFavorite: appStore.removeFavorite,
  onSelect: appStore.selectChapter
}))
@observer
export default class ChapterList extends React.Component {
  componentWillMount () {
    this.props.manga.loadChapters()
  }

  keyExtractor = (chapter) => chapter.link
  renderChapter = ({ item }) => {
    return <Chapter chapter={item} onSelect={this.props.onSelect} />
  }

  render () {
    const { manga, isFavorite, addFavorite, removeFavorite,
      onClose } = this.props

    return <View style={styles.topLevel}>
      <View style={styles.navBar}>
        <Text style={styles.back} onPress={onClose}>
          {'<'} Back
        </Text>
        <Text style={styles.navTitle}>
          {manga.title}
        </Text>
      </View>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: manga.cover}} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>
            {manga.title.toUpperCase()}
          </Text>
          {manga.tags.length > 0 && <Text style={styles.tags}>
            {manga.tags.join(', ').toUpperCase()}
          </Text>}
          <ScrollView>
            <Text style={styles.summary}>{manga.summary}</Text>
          </ScrollView>
          {!isFavorite
            ? <Button onPress={addFavorite} title='Add to Favorites' />
            : <Button onPress={removeFavorite} title='Remove from Favorites' />}
        </View>
      </View>
      <FlatList
        data={manga.chapters}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderChapter}
        refreshing={manga.chapters.length === 0}
        onRefresh={() => null}
      />
    </View>
  }
}

@observer
class Chapter extends React.Component {
  render () {
    const { chapter } = this.props
    const chapterStyle = chapter.read
      ? styles.chapter
      : { ...styles.chapter, ...styles.chapterUnread }

    return <TouchableWithoutFeedback onPress={this.onSelect}>
      <View style={chapterStyle}>
        <Text style={styles.chapterTitle}>
          CHAPTER {chapter.title}
        </Text>
        {chapter.isNew() && <Text style={styles.newText}>New!</Text>}
        <Text style={styles.date}>
          {chapter.date && chapter.date.toLocaleDateString()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  }

  onSelect = () => {
    this.props.onSelect(this.props.chapter)
  }
}
