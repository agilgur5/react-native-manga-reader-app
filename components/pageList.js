import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'

import { getPages, getImage } from '../utils/api.js'

import styles from './pageStyles.js'

export default class PageList extends React.PureComponent {
  state = {
    showNav: false,
    currentPage: 1
  }
  componentWillMount () {
    const { chapter, onLoad } = this.props
    getPages(chapter.link).then(onLoad)
  }

  renderPage = ({ item }) => {
    return <Page page={item} toggleNav={this.toggleNav} />
  }
  keyExtractor (item) { return item }

  // keep track of current page
  onScrollEnd = (ev) => {
    const { contentOffset, layoutMeasurement } = ev.nativeEvent
    const { x, y } = contentOffset
    const { width, height } = layoutMeasurement

    const isHorizontal = this.props.isHorizontal
    // divide offset by size to get current pageNum, 1-indexed
    const pageNum = Math.floor(isHorizontal ? x / width : y / height) + 1
    this.setState({currentPage: pageNum})
  }

  toggleNav = () => {
    this.setState(({showNav}) => ({showNav: !showNav}))
  }

  render () {
    const { chapter, pages, isHorizontal, toggleHorizontal,
      onClose } = this.props
    const { showNav, currentPage } = this.state

    return <View style={styles.pagesContainer}>
      <View style={{
        ...styles.navBar,
        opacity: showNav ? 0.85 : 0
      }}>
        <Text style={styles.back} onPress={onClose}>
          {'<'} Back
        </Text>
        <Text style={styles.chapter}>
          Ch. {chapter.title} ({currentPage}/{pages.length})
        </Text>
        <Text style={styles.direction} onPress={toggleHorizontal}>
          Swipe {isHorizontal ? 'Left <' : 'Down V'}
        </Text>
      </View>
      {/* paging does not work on vertical Android :/
      https://facebook.github.io/react-native/docs/scrollview#pagingenabled */}
      <FlatList
        data={pages}
        renderItem={this.renderPage}
        keyExtractor={this.keyExtractor}
        refreshing={pages.length === 0}
        onRefresh={() => null}
        pagingEnabled
        horizontal={isHorizontal}
        inverted={isHorizontal}
        directionalLockEnabled
        onMomentumScrollEnd={this.onScrollEnd}
      />
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
    const { toggleNav } = this.props
    const { image, imageWidth, imageHeight } = this.state

    const { height, width } = Dimensions.get('window')
    // aspectRatio will be > 1, so set width instead of height
    const imageSize = imageWidth > imageHeight ? { width } : { height }

    return <TouchableWithoutFeedback onLongPress={toggleNav}>
      <View style={{
        ...styles.page,
        ...{ height, width }
      }}>
        {image && <Image
          style={{
            ...imageSize,
            aspectRatio: imageWidth / imageHeight
          }}
          resizeMode='cover'
          source={{uri: image}}
        />}
      </View>
    </TouchableWithoutFeedback>
  }
}
