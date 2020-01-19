import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import 'es6-promise/auto'
import 'setimmediate'

import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import registerServiceWorker from 'registerServiceWorker'

import Layout from 'components/LayoutComponents/Layout'
import reducer from 'reducers'
import axiosInterceptor from './axiosInterceptor'
import { setUserState,connectMqtt } from 'reducers/app'

import 'resources/_antd.less' // redefinition AntDesign variables
import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap styles

import 'resources/AntStyles/AntDesign/antd.cleanui.scss'
import 'resources/CleanStyles/Core/core.cleanui.scss'
import 'resources/CleanStyles/Vendors/vendors.cleanui.scss'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const middlewares = [router, thunk]
const isLogger = false
if (isLogger && process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))
// axios interceptor
axiosInterceptor(store)
let { userState } = store.getState().app
if (!userState || !userState.token) {
  const token = window.localStorage.getItem("app.token")
  if (token) {
    //set app state
    let userState = JSON.parse(window.localStorage.getItem("app.userState"))
    store.dispatch(setUserState({ userState }))
  }
}
store.dispatch(connectMqtt())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enGB}>
        <div>
          <Helmet titleTemplate='OnSky - %s' />
          <Layout history={history}  userState={store.getState().app.userState}/>
        </div>
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()

export default history
