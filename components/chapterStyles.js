const styles = {
  topLevel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333'
  },
  header: {
    flexDirection: 'row',
    maxHeight: 349,
    backgroundColor: '#1a1a1a'
  },
  imageContainer: {
    position: 'relative',
    width: '33%',
    maxHeight: 349, // also needed here for proper fit
    padding: 3,
    aspectRatio: 0.642857143
  },
  image: {
    width: '100%',
    height: '100%',
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
  chapter: {
    padding: 16,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  chapterTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '900',
    color: '#fff'
  }
}

export default styles
