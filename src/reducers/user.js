import { createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { push } from 'react-router-redux'
import { notification } from 'antd'

export const REDUCER = 'user'

const api = constant.api.authen
const userApi = `${api.host}/${api.user}`

export const submit = model => (dispatch, getState) => {
  axios
    .post(userApi, model)
    .then(response => {
      console.log(response)
      if (response && response.data) {
      }
    })
    .catch(error => {
      let errorMessage = 'get user fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
    })
}

const initialState = {
  page: 0,
  users: [
    {
      active: true,
      created_at: '2018-12-04T10:29:14.705Z',
      customer: {
        account_number: 'string',
        active: true,
        address1: 'string',
        address2: 'string',
        alias: 'string',
        confirmed: true,
        created_at: '2018-12-04T10:29:14.705Z',
        deleted_at: '2018-12-04T10:29:14.705Z',
        domain: 'string',
        email: 'string',
        first_name: 'string',
        id: 0,
        image: {
          created_at: '2018-12-04T10:29:14.705Z',
          deleted_at: '2018-12-04T10:29:14.705Z',
          id: 0,
          path: 'string',
          updated_at: '2018-12-04T10:29:14.705Z',
        },
        last_name: 'string',
        mobile: 'string',
        updated_at: '2018-12-04T10:29:14.705Z',
      },
      deleted_at: '2018-12-04T10:29:14.705Z',
      groups: [
        {
          created_at: '2018-12-04T10:29:14.705Z',
          customer: {
            account_number: 'string',
            active: true,
            address1: 'string',
            address2: 'string',
            alias: 'string',
            confirmed: true,
            created_at: '2018-12-04T10:29:14.705Z',
            deleted_at: '2018-12-04T10:29:14.705Z',
            domain: 'string',
            email: 'string',
            first_name: 'string',
            id: 0,
            image: {
              created_at: '2018-12-04T10:29:14.705Z',
              deleted_at: '2018-12-04T10:29:14.705Z',
              id: 0,
              path: 'string',
              updated_at: '2018-12-04T10:29:14.705Z',
            },
            last_name: 'string',
            mobile: 'string',
            updated_at: '2018-12-04T10:29:14.705Z',
          },
          deleted_at: '2018-12-04T10:29:14.705Z',
          id: 0,
          name: 'string',
          updated_at: '2018-12-04T10:29:14.705Z',
          users: [null],
          uuid: 'string',
        },
      ],
      id: 0,
      last_login: '2018-12-04T10:29:14.705Z',
      last_password_change: '2018-12-04T10:29:14.705Z',
      role: {
        access_level: 0,
        id: 0,
        name: 'string',
      },
      updated_at: '2018-12-04T10:29:14.705Z',
      username: 'string',
      uuid: 'string',
    },
  ],
}
const ACTION_HANDLES = {}
export default createReducer(ACTION_HANDLES, initialState)
