import "babel-polyfill"
import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './components/history'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes';


import './css/app.scss'
import './css/corp.scss'
import './css/openApi.scss'

const store   = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
render(
  <Provider store={store}>
      <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById('app')
)
