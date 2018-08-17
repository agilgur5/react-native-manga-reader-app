import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'

import styles from './mangaStyles.js'

export default class MangaList extends React.PureComponent {
  keyExtractor = (manga) => manga.link

  renderManga = ({ item }) => (
    <Manga manga={item} onSelect={this.props.onSelect(item)} />
  )

  render () {
    const { refreshing, mangas, onRefresh, onEndReached } = this.props
    const columns = Dimensions.get('window').width < 512 ? 3 : 4

    return (
      <FlatList
        style={styles.mangas}
        numColumns={columns}
        data={mangas}
        keyExtractor={this.keyExtractor}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndThreshold={0}
        renderItem={this.renderManga}
      />
    )
  }
}

class Manga extends React.PureComponent {
  render () {
    const { manga, onSelect } = this.props

    return (
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={styles.manga}>
          <Image style={styles.image} source={{uri: manga.cover}} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {manga.title.toUpperCase()}
            </Text>
            <Text
              style={{
                ...styles.release,
                color: manga.release === 'Today' ? '#fff' : '#aaa'
              }}
            >
              {manga.release.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
