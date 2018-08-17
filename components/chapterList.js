import React from 'react'
import { FlatList, ScrollView, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'

import { getChapters } from '../utils/api.js'

import styles from './chapterStyles.js'

export default class ChapterList extends React.PureComponent {
  componentWillMount () {
    const { manga, onLoad } = this.props
    getChapters(manga.link).then(onLoad)
  }

  keyExtractor = (chapter) => chapter.link

  renderChapter = ({ item }) => {
    return <Chapter chapter={item} onSelect={this.props.onSelect(item)} />
  }

  render () {
    const { manga, chapters, tags, summary, onClose } = this.props

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
          {tags.length && <Text style={styles.tags}>
            {tags.join(', ').toUpperCase()}
          </Text>}
          <ScrollView>
            <Text style={styles.summary}>{summary}</Text>
          </ScrollView>
        </View>
      </View>
      <FlatList
        data={chapters}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderChapter}
        refreshing={chapters.length === 0}
        onRefresh={() => null}
      />
    </View>
  }
}

class Chapter extends React.PureComponent {
  render () {
    const { chapter, onSelect } = this.props

    return <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.chapter}>
        <Text style={styles.chapterTitle}>
          CHAPTER {chapter.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  }
}
