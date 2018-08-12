const styles = {
  chapters: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a'
  },
  description: {
    position: 'absolute',
    width: `${100 - 100 / columns}%`,
    top: 0,
    bottom: 0,
    right: 0
  },
  descriptionTextContainer: {
    padding: 3,
    paddingRight: 16
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20
  },
  imageContainer: {
    position: 'relative',
    width: `${100 / columns}%`,
    padding: 3,
    aspectRatio: 0.642857143
  },
  image: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
    width: '100%',
    backgroundColor: '#000'
  },
  chaptersList: {},
  chapter: {
    padding: 16,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  chapterText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '900',
    color: '#fff'
  }
}

export default styles
