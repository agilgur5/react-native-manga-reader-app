import React from 'react'
import { Provider } from 'mobx-react'

import AppModel from './models/models.js'
import MainView from './components/mainView.js'

const appStore = AppModel.create()

const App = () => (
  <Provider appStore={appStore}>
    <MainView />
  </Provider>
)

export default App
