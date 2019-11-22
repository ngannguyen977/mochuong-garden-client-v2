import { push } from "react-router-redux"
import moment from "moment"
import constant from '../config/default'
import {
  setUserState,
  setLoading,
  setDataTypeState,
  setAlertTypeState,
  setThingTypeState,
  setIotActionState,
} from "reducers/app"
import { message } from "antd"
import axios from 'axios'

const ignoreAuth = ["/register", "/login", "/empty", "/customers/activate", "/forgot-password", "/forgot-password/success", "/recovery-password"]
const api = constant.api.authen
const externalAuthApi = `${api.host}/${api.external}`

export const authorize = () => (dispatch, getState) => new Promise((resolve, reject) => {
  let { app, routing } = getState()
  const location = routing.location
  if (ignoreAuth.includes(location.pathname)) {
    return resolve(true)
  }
  if (!app.userState.token) {
    const token = window.localStorage.getItem("app.token")
    if (token) {
      //set app state
      let userState = JSON.parse(window.localStorage.getItem("app.userState"))
      dispatch(setUserState({ userState }))

      return resolve(true)
    }
    return reject(handleUnauthorize(routing, dispatch, "Authentication fail"))
  }
  let nowUtc = moment.utc(new Date())
  let expires = moment.utc(app.userState.expires)

  if (nowUtc.isAfter(expires)) {
    return reject(handleUnauthorize(routing, dispatch, "Authentication expired"))
  }
  return resolve(true)
})
export const handleUnauthorize = (routing, dispatch, notify) => {
  let search = ''
  if (notify) {
    message.error(notify)
  }
  if (routing && routing.location && routing.location.search) {
    search = `${routing.location.search}&refererLink=${routing.location.pathname}`
  }
  // dispatch(setLoading(false))
  dispatch(push(`/login${search}`))

  return notify
}

export const externalAuth = (model, link) => (dispatch, getState) => {
  axios
    .post(externalAuthApi, model)
    .then(response => {
      if (response && response.data && response.data.redirect_uri) {
        window.location.href = response.data.redirect_uri
      } else {
        let errorMessage = "&error=fail"
        dispatch(push(`/login${link}${errorMessage}`))
      }
    })
    .catch(error => {
      let errorMessage = ''
      if (error.response && error.response.data && error.response.data.description) {
        errorMessage = `&error=${error.response.data.description}`
      }
      dispatch(push(`/login${link}${errorMessage}`))
      return
    })
}