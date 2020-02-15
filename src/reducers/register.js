import { createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { setAccessConfirmPage } from 'reducers/app'
import { push } from 'react-router-redux'
import { notification } from 'antd'
export const REDUCER = 'register'

const api = constant.api.authen
const registerApi = `${api.host}/${api.observer}`

export const submit = model => (dispatch, getState) => {
  model.customerNumber = constant.customer.number
  axios
    .post(registerApi, model)
    .then(response => {
      if (response && response.data) {
        dispatch(setAccessConfirmPage(true))
        dispatch(push('/customers/activate'))
        notification.open({
          type: 'success',
          message: 'You have register successfully!',
          description:
            'Welcome to the OnSky Family. Please confirm email and login to access OnSky IoT Website Application',
        })
      }
    })
    .catch(error => {
      console.log(error)
      let errorMessage = 'register fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
    })
}

const initialState = {}
const ACTION_HANDLES = {}
export default createReducer(ACTION_HANDLES, initialState)
