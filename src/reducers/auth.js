import { push } from 'react-router-redux'
import moment from 'moment'
import {
  setUserState,
  setLoading,
  setDataTypeState,
  setAlertTypeState,
  setThingTypeState,
  setIotActionState,
} from 'reducers/app'
import { message } from 'antd'

const ignoreAuth = ['/register', '/login', '/empty', '/customers/activate']

export const authorize = () => (dispatch, getState) => {
  let { app, routing } = getState()
  const location = routing.location
  if (ignoreAuth.includes(location.pathname)) {
    return Promise.resolve(true)
  }
  if (!app.userState.token) {
    const token = JSON.parse(window.localStorage.getItem('app.token'))
    if (token) {
      //set app state
      let userState = JSON.parse(window.localStorage.getItem('app.userState'))
      dispatch(setUserState({ userState }))

      return Promise.resolve(true)
    }
    message.error('Authentication fail')
    return handleUnauthorize(routing, dispatch)
  }
  let nowUtc = moment.utc(new Date())
  let expires = moment.utc(app.userState.expires)

  if (nowUtc.isAfter(expires)) {
    message.error('Authentication expired')
    return handleUnauthorize(routing, dispatch)
  }
  return Promise.resolve(true)
}
export const handleUnauthorize = (routing, dispatch, notify) => {
  if (notify) {
    message.error('Unauthorized!')
  }
  dispatch(setLoading(false))
  dispatch(push('/login'))

  return Promise.reject()
}
