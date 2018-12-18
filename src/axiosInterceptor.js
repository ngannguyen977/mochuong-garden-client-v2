import axios from 'axios'
import { setLoading } from 'reducers/app'
import { handleUnauthorize } from 'reducers/auth'
import { push } from 'react-router-redux'
import constant from './config/default'
import { message } from 'antd'
let isAbsoluteURLRegex = /^(?:\w+:)\/\//

const createAxiosInterceptor = store => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function(config) {
      store.dispatch(setLoading(true))
      // Do something before request is sent
      const { app } = store.getState()

      if (app && app.userState && app.userState.token) {
        config.headers['Authorization'] = 'Bearer ' + app.userState.token
      }
      // Concatenate base path if not an absolute URL
      if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = `${constant.api.authen.host}/${config.url}`
      }
      return config
    },
    function(error) {
      store.dispatch(setLoading())
      // Do something with request error
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    function(response) {
      store.dispatch(setLoading())
      return response
    },
    function(error) {
      console.log(error.response,error.response.status)
      if (error.response) {
        if (error.response.status === 401) {
          console.log('unauthorize',store)
          store.dispatch(handleUnauthorize(store.routing,store.dispatch))
          // message.error('Unauthorized')
        }
        if (error.response.status === 400) {
          // message.error(error.response.data)
        }
        if (error.response.status === 500) {
          //  TODO: Log error
          // message.error(error.response.data)
        }
      }
      store.dispatch(setLoading())
      return Promise.reject(error)
    },
  )
}

export default createAxiosInterceptor
