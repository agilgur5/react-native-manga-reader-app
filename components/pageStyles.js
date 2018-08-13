const textStyles = {
  fontSize: 30,
  color: 'gray'
}

const styles = {
  pagesContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000'
  },
  navBar: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: 34,
    backgroundColor: '#333'
  },
  back: {
    position: 'absolute',
    left: 0,
    zIndex: 1, // to be above the chapter text (since it's relative)
    ...textStyles
  },
  chapter: {
    position: 'relative', // needed to center
    textAlign: 'center',
    ...textStyles
  },
  direction: {
    position: 'absolute',
    right: 0,
    ...textStyles
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default styles
