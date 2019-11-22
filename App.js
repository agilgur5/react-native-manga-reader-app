import React from 'react'
import persist from 'mst-persist'
import { AsyncStorage } from 'react-native'
import { Provider } from 'mobx-react'

import AppModel from './models/models.js'
import MainView from './components/mainView.js'

const appStore = AppModel.create()

persist('@mangaStoreKey', appStore, {
  storage: AsyncStorage,
  jsonify: true, // set to true if using AsyncStorage
  whitelist: [
    'mangas',
    'favorites'
  ]
}).then(() => {
  // fetch chapters on app load so that numNewUnread is updated
  appStore.loadFavoritesChapters()
})

const App = () => (
  <Provider appStore={appStore}>
    <MainView />
  </Provider>
)

export default App
