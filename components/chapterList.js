import React from 'react'
import { Dimensions, FlatList, ScrollView, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'

import { getChapters } from '../utils/api.js'

import styles from './chapterStyles.js'

export default class ChapterList extends React.PureComponent {
  componentWillMount () {
    const { manga, onLoad } = this.props
    getChapters(manga.link).then(onLoad)
  }

  getKey = ({ key }) => key

  renderChapter = ({ item }) => (
    <Chapter chapter={item} onSelect={this.props.onSelect(item)} />
  )

  render () {
    const { manga, chapters, tags, summary, onClose } = this.props
    const columns = Dimensions.get('window').width < 512 ? 3 : 4

    return (
      <View style={styles.chapters}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={{
              ...styles.imageContainer,
              width: `${100 / columns}%`
            }}>
              <Image style={styles.image} source={{uri: manga.cover}} />
            </View>
          </TouchableWithoutFeedback>
          <ScrollView contentContainerStyle={styles.descriptionTextContainer}
            style={{
              ...styles.description,
              width: `${100 - 100 / columns}%`
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                lineHeight: 16,
                paddingBottom: 8,
                textAlign: 'left',
                fontWeight: '900'
              }}
            >
              {manga.title.toUpperCase()}
            </Text>
            {tags.length && (
              <Text
                style={{
                  ...styles.descriptionText,
                  paddingBottom: 8,
                  fontSize: 10,
                  lineHeight: 16,
                  fontWeight: '500'
                }}>
                {tags.join(', ').toUpperCase()}
              </Text>
            )}
            {summary && <Text style={styles.descriptionText}>{summary}</Text>}
          </ScrollView>
        </View>
        <FlatList
          style={styles.chaptersList}
          data={chapters}
          keyExtractor={this.getKey}
          refreshing={chapters.length === 0}
          renderItem={this.renderChapter}
        />
      </View>
    )
  }
}

class Chapter extends React.PureComponent {
  render () {
    const { chapter, onSelect } = this.props

    return (
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={styles.chapter}>
          <Text style={styles.chapterText}>
            CHAPTER {chapter.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
