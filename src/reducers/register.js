import { createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { push } from 'react-router-redux'
import { notification } from 'antd'

export const REDUCER = 'register'

const api = constant.api.authen
const registerApi = `${api.host}/${api.register}`

export const submit = model => (dispatch, getState) => {
  axios
    .post(registerApi, model)
    .then(response => {
      console.log(response)
      if (response && response.data) {
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
      let errorMessage = 'register fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
    })
}

const initialState = {
  // "id": 3,
  // "created_at": "2018-12-04T01:53:17.976214338Z",
  // "updated_at": "2018-12-04T01:53:17.976214338Z",
  // "account_number": "1926597978575864835",
  // "first_name": "string",
  // "last_name": "string",
  // "email": "oz@abc.com",
  // "mobile": "123456",
  // "alias": "onsky1",
  // "confirmed": false,
  // "active": true
}
const ACTION_HANDLES = {}
export default createReducer(ACTION_HANDLES, initialState)
