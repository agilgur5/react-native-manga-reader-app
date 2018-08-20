import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'

import styles from './mangaStyles.js'

@observer
export default class MangaList extends React.Component {
  keyExtractor = (manga) => manga.link

  renderManga = ({ item }) => (
    <Manga manga={item} onSelect={this.props.onSelect(item)} />
  )

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

class Manga extends React.PureComponent {
  render () {
    const { manga, onSelect } = this.props

    return <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.manga}>
        <Image style={styles.image} source={{uri: manga.cover}} />
        <View style={styles.shadeOverlay} />
        <Text style={styles.title}>
          {manga.title.toUpperCase()}
        </Text>
        <Text
          style={{
            ...styles.release,
            color: manga.release === 'Today' ? '#fff' : '#aaa'
          }}
        >
          {manga.release && manga.release.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  }
}
