const styles = {
  topLevel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333'
  },

  // nav styles
  navBar: {
    width: '100%',
    height: 34
  },
  back: {
    position: 'absolute',
    left: 0,
    zIndex: 1, // to be above the chapter text (since it's relative)
    fontSize: 30,
    color: 'gray'
  },
  navTitle: {
    position: 'relative', // needed to center
    textAlign: 'center',
    fontSize: 30,
    color: 'gray'
  },

  // manga desc styles
  header: {
    flexDirection: 'row',
    maxHeight: 349,
    backgroundColor: '#1a1a1a'
  },
  image: {
    width: '33%',
    height: '100%',
    maxHeight: 349, // also needed here for proper fit
    aspectRatio: 0.642857143,
    padding: 3,
    backgroundColor: '#000'
  },
  descriptionContainer: {
    width: '67%',
    padding: 3,
    paddingRight: 16
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 16,
    paddingBottom: 8
  },
  tags: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    paddingBottom: 8
  },
  summary: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20
  },

  // chapter list styles
  chapter: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  chapterUnread: {
    backgroundColor: '#555'
  },
  chapterTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '900',
    color: '#fff'
  },
  newText: {
    marginLeft: 6,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '900',
    color: '#8ca0d1' // pale blue
  },
  date: {
    marginLeft: 'auto', // right align
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700', // smaller than rest as not as important
    color: '#ddd' // v. light gray
  }
}

export default styles
