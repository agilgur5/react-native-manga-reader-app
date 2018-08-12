import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'

import { getPages, getImage } from '../utils/api.js'

import styles from './pageStyles.js'

export default class Pages extends React.PureComponent {
  state = {
    showNav: false
  }
  componentWillMount () {
    const { chapter, onLoad } = this.props
    getPages(chapter.link).then(onLoad)
  }

  renderPage = ({ item }) => (
    <Page direction={this.props.direction} page={item} />
  )
  keyExtractor (item) { return item }

  toggleNav = () => {
    console.log('toggling nav...')
    this.setState(({showNav}) => ({showNav: !showNav}))
  }

  render () {
    const { pages, direction, onClose, onToggle } = this.props
    const { showNav } = this.state

    return <View style={styles.pagesContainer}>
      <View style={{
        ...styles.navBar,
        opacity: showNav ? 80 : 0
      }}>
        <Text style={styles.close} onPress={onClose}>
          Back
        </Text>
        <Text style={styles.direction} onPress={onToggle}>
          Direction: {direction === 'horizontal' ? 'Left' : 'Down'}
        </Text>
      </View>
      <TouchableWithoutFeedback onLongPress={this.toggleNav}>
        <View style={styles.pagesList}>
          {pages.length && <FlatList
            style={styles.pagesList}
            data={pages}
            renderItem={this.renderPage}
            keyExtractor={this.keyExtractor}
            horizontal={direction === 'horizontal'}
            inverted={direction === 'horizontal'}
            directionalLockEnabled
          />}
        </View>
      </TouchableWithoutFeedback>
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
      ? { height: dimensions.height }
      : { width: dimensions.width }

    return <View style={styles.pagesList} onMoveShouldSetResponder={() => true}>
      {image && <Image
        style={{
          ...size,
          aspectRatio: width / height
        }}
        resizeMode='cover'
        source={{uri: image}}
      />}
    </View>
  }
}
