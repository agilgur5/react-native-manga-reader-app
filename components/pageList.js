import React from 'react'
import { Dimensions, FlatList, View, Text, Image,
  TouchableWithoutFeedback } from 'react-native'
import { inject, observer } from 'mobx-react'

import { getImage } from '../models/api.js'

import styles from './pageStyles.js'

@inject(({appStore}) => ({
  isHorizontal: appStore.isHorizontal,
  toggleHorizontal: appStore.toggleHorizontal,
  chapter: appStore.selectedChapter,
  onClose: appStore.deselectChapter
}))
@observer
export default class PageList extends React.Component {
  state = {
    showNav: false,
    currentPage: 1
  }
  componentWillMount () {
    this.props.chapter.loadPages()
  }

  keyExtractor (page) { return page.link }
  renderPage = ({ item }) => {
    return <Page page={item.link} toggleNav={this.toggleNav} />
  }
  toggleNav = () => {
    this.setState(({showNav}) => ({showNav: !showNav}))
  }

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
  getContentOffset = () => {
    const isHorizontal = this.props.isHorizontal
    const pageNum = this.state.currentPage
    const { width, height } = Dimensions.get('window')

    const x = width * (pageNum - 1)
    const y = height * (pageNum - 1)
    const initOffset = {x: 0, y: 0}
    return {
      ...initOffset,
      ...(isHorizontal ? {x} : {y})
    }
  }

  render () {
    const { isHorizontal, toggleHorizontal, chapter, onClose } = this.props
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
          Ch. {chapter.title} ({currentPage}/{chapter.pages.length})
        </Text>
        <Text style={styles.direction} onPress={toggleHorizontal}>
          Swipe {isHorizontal ? 'Left <' : 'Down V'}
        </Text>
      </View>
      {/* paging does not work on vertical Android :/
      https://facebook.github.io/react-native/docs/scrollview#pagingenabled */}
      <FlatList
        data={chapter.pages}
        renderItem={this.renderPage}
        keyExtractor={this.keyExtractor}
        refreshing={chapter.pages.length === 0}
        onRefresh={() => null}
        pagingEnabled
        horizontal={isHorizontal}
        inverted={isHorizontal}
        directionalLockEnabled
        onMomentumScrollEnd={this.onScrollEnd}
        contentOffset={this.getContentOffset()}
      />
    </View>
  }
}

class Page extends React.PureComponent {
  state = {
    image: null,
    imageWidth: null,
    imageHeight: null
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
    const canRender = image && Number.isInteger(imageWidth) &&
      Number.isInteger(imageHeight)

    const { height, width } = Dimensions.get('window')
    // aspectRatio will be > 1, so set width instead of height
    const imageSize = imageWidth > imageHeight ? { width } : { height }

    return <TouchableWithoutFeedback onLongPress={toggleNav}>
      <View style={{
        ...styles.page,
        ...{ height, width }
      }}>
        {canRender && <Image
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
