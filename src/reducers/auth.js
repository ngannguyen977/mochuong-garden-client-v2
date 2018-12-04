import { push } from 'react-router-redux'
import moment from 'moment'
import { _setFrom } from 'reducers/app'
import { message } from 'antd'

const ignoreAuth = ['/register', '/login', '/empty', '/customers/activate']
export const authorize = () => (dispatch, getState) => {
  let { app, routing } = getState()
  const location = routing.location
  if (ignoreAuth.includes(location.pathname)) {
    return Promise.resolve(true)
  }
  if (!app.userState.token) {
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
export const handleUnauthorize = (routing, dispatch) => {
  const location = routing.location
  const from = location.pathname + location.search
  dispatch(_setFrom(from))
  dispatch(push('/login'))

  return Promise.reject()
}
