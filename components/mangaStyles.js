const styles = {
  manga: {
    margin: 3,
    flex: 1,
    maxWidth: '25%', // 4 mangas per row
    aspectRatio: 0.642857143,
    backgroundColor: '#000000'
  },
  image: {
    width: '100%',
    aspectRatio: 0.642857143
  },
  shadeOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  title: {
    position: 'absolute',
    bottom: 20,
    paddingLeft: 4,
    paddingRight: 4,
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '900'
  },
  release: {
    position: 'absolute',
    bottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500'
  }
}

export default styles
