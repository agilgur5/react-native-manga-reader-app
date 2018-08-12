import React from 'react'
import { Dimensions, FlatList, View, Text, Image } from 'react-native'

import { getPages, getImage } from '../utils/api.js'

import styles from './pageStyles.js'

export default class Pages extends React.PureComponent {
  componentWillMount () {
    const { chapter, onLoad } = this.props
    getPages(chapter.link).then(onLoad)
  }

  renderPage = ({ item }) => (
    <Page direction={this.props.direction} page={item} />
  )
  keyExtractor (item) { return item }

  render () {
    const { pages, direction, onClose, onToggle } = this.props

    return <View style={styles.pagesContainer}>
      <View style={styles.navBar}>
        <Text style={styles.close} onPress={onClose}>
          Back
        </Text>
        <Text style={styles.direction} onPress={onToggle}>
          Direction: {direction === 'horizontal' ? 'Left' : 'Down'}
        </Text>
      </View>
      {pages.length && <FlatList
        style={styles.pagesList}
        data={pages}
        horizontal={direction === 'horizontal'}
        inverted={direction === 'horizontal'}
        directionalLockEnabled
        renderItem={this.renderPage}
        keyExtractor={this.keyExtractor}
      />}
    </View>
  }
}

class Page extends React.PureComponent {
  state = {
    image: null,
    width: 0,
    height: 0
  }

  componentWillMount () {
    const { page } = this.props
    getImage(page).then((image) => {
      this.setState({ image })
      Image.getSize(image, (width, height) => this.setState({ width, height }))
    })
  }

  render () {
    const { direction } = this.props
    const { image, width, height } = this.state

    const dimensions = Dimensions.get('window')
    const size = direction === 'horizontal'
      ? { height: dimensions.height - styles.navBar.height }
      : { width: dimensions.width }

    return image && <Image
      style={{
        ...size,
        aspectRatio: width / (height - styles.navBar.height)
      }}
      resizeMode='cover'
      source={{uri: image}}
    />
  }
}
