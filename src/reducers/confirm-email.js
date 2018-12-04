import { createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'

export const REDUCER = 'confirm-email'

const api = constant.api.authen
const confirmApi = `${api.host}/${api.confirmEmail}`

export const submit = code => (dispatch, getState) => {
  console.log('confirm', code)
  axios
    .post(`${confirmApi}?code=${code}`)
    .then(response => {
      console.log(response)
      if (response && response.data) {
        notification.open({
          type: 'success',
          message: 'You have comfirm email successfully!',
          description:
            'Welcome to the OnSky Family. Now you can login to access OnSky IoT Website Application',
        })
      }
    })
    .catch(error => {
      let errorMessage = 'confirm email fail'
      message.error(errorMessage)
    })
}

const initialState = {}
const ACTION_HANDLES = {}
export default createReducer(ACTION_HANDLES, initialState)
