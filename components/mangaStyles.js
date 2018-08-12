const styles = {
  mangas: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  manga: {
    position: 'relative',
    margin: 3,
    flex: 1,
    aspectRatio: 0.642857143,
    backgroundColor: '#000000'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    aspectRatio: 0.642857143
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  text: {
    position: 'absolute',
    bottom: 20,
    left: 4,
    right: 4,
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'left',
    fontWeight: '900'
  },
  release: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    color: '#fff',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'left',
    fontWeight: '500'
  }
}

export default styles
