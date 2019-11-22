import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'

import styles from './mangaStyles.js'

@observer
export default class MangaList extends React.Component {
  keyExtractor = (manga) => manga.link
  renderManga = ({ item }) => {
    return <Manga manga={item} onSelect={this.props.onSelect} />
  }

  render () {
    const { refreshing, mangas, onRefresh, onEndReached } = this.props
    const columns = Dimensions.get('window').width < 512 ? 3 : 4

    // use .slice() below because FlatList is not an observer and refs are
    // constant -- .slice() creates a new ref
    return <FlatList
      numColumns={columns}
      data={mangas.slice()}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderManga}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndThreshold={0}
    />
  }
}

@observer
class Manga extends React.Component {
  render () {
    const { manga } = this.props
    // show either the number of new unread chapters if available or
    // "Today" / "Yesterday" if available
    const newText = manga.numNewUnreadChapters()
      ? manga.numNewUnreadChapters() + ' new unread chapters'
      : manga.release && manga.release.toUpperCase()
    const isNew = manga.numNewUnreadChapters() || manga.release === 'Today'

    return <TouchableWithoutFeedback onPress={this.onSelect}>
      <View style={styles.manga}>
        <Image style={styles.image} source={{uri: manga.cover}} />
        <View style={styles.shadeOverlay} />
        <Text style={styles.title}>
          {manga.title.toUpperCase()}
        </Text>
        <Text
          style={{
            ...styles.release,
            color: isNew ? '#fff' : '#aaa'
          }}
        >
          {newText}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  }

  onSelect = () => {
    this.props.onSelect(this.props.manga)
  }
}
