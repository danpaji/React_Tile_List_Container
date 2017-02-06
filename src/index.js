import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import PremierStore from './store'

import * as A from './store/actions'

// We add the initial state from the local storage; if not found, we add a empty JS object {}
let initialState = localStorage['premierData'] ? JSON.parse(localStorage['premierData']) : {}
const store = PremierStore(initialState)

// We add references for debugging and testing
window.pStore = store
window.pActions = A

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)