import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'mobx-react'

import AppModel from './models/models.js'
import { persist } from './utils/persist'
import MainView from './components/mainView.js'

const appStore = AppModel.create()

persist('@mangaStoreKey', appStore, {
  storage: AsyncStorage,
  jsonify: true // set to true if using AsyncStorage
}, {
  mangas: true,
  favorites: true
})

const App = () => (
  <Provider appStore={appStore}>
    <MainView />
  </Provider>
)

export default App
