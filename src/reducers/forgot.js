import { createReducer } from 'redux-act'
import * as app from 'reducers/app'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'
export const REDUCER = 'forgot'

// Add forgot password api
const api = constant.api.authen
const forgotApi = `${api.host}/${api.forgot}`

export const submit = ({ alias, username }) => (dispatch, getState) => {
  dispatch(app.addSubmitForm(REDUCER))
  axios
    .post(forgotApi, { alias, username })
    .then(() => {
      dispatch(app.setAccessConfirmPage(true))
      dispatch(push('/forgot-password/success?sent=true'))
    })
    .catch((err) => {
      notification.error({
        message: "Request forgot password failed!",
        description: err.response.data.Message,
      })
      // return resolve(false)
    })
}

export const restrictAccessConfirmPage = (isAccessible) => (dispatch, getState) => {
  if (isAccessible) {
    dispatch(app.setAccessConfirmPage(!isAccessible))
  }
}

const initialState = {}
export default createReducer({}, initialState)
