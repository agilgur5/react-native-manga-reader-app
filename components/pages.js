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
    <Page page={item} direction={this.props.direction}
      toggleNav={this.toggleNav} />
  )
  keyExtractor (item) { return item }

  toggleNav = () => {
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
      {pages.length && <FlatList
        data={pages}
        renderItem={this.renderPage}
        keyExtractor={this.keyExtractor}
        horizontal={direction === 'horizontal'}
        inverted={direction === 'horizontal'}
        directionalLockEnabled
      />}
    </View>
  }
}

class Page extends React.PureComponent {
  state = {
    image: null,
    imageWidth: 0,
    imageHeight: 0
  }

  componentWillMount () {
    const { page } = this.props
    getImage(page).then((image) => {
      this.setState({ image })
      Image.getSize(image, (imageWidth, imageHeight) =>
        this.setState({ imageWidth, imageHeight })
      )
    })
  }

  render () {
    const { direction, toggleNav } = this.props
    const { image, imageWidth, imageHeight } = this.state

    const { height, width } = Dimensions.get('window')
    const size = direction === 'horizontal' ? { height } : { width }

    return <TouchableWithoutFeedback onLongPress={toggleNav}>
      <View>
        {image && <Image
          style={{
            ...size,
            aspectRatio: imageWidth / imageHeight
          }}
          resizeMode='cover'
          source={{uri: image}}
        />}
      </View>
    </TouchableWithoutFeedback>
  }
}
