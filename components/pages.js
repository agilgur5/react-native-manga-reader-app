import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'

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

  render () {
    const { pages, direction, onClose, onToggle } = this.props
    return (
      <View style={styles.pages}>
        {pages.length && <ScrollView
          style={styles.pagesList}
          data={pages}
          horizontal={direction === 'horizontal'}
          inverted={direction === 'horizontal'}
          directionalLockEnabled
          renderItem={this.renderPage}
        />}
        <Text style={styles.pagesClose} onPress={onClose}>
          CLOSE
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            fontSize: 32,
            color: 'rgba(0, 0, 0, 0)',
            backgroundColor: 'transparent'
          }}
          onPress={onToggle}
        >
          DIRECTION
        </Text>
      </View>
    )
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
    const size = direction === 'horizontal'
      ? { height: dimensions.height }
      : { width: dimensions.width }
    return image && (
      <Image
        style={{
          ...styles.pageImage,
          ...size,
          aspectRatio: width / height
        }}
        resizeMode='cover'
        source={{uri: image}}
      />
    )
  }
}
