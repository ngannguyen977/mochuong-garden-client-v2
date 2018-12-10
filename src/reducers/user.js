import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { push } from 'react-router-redux'
import { notification } from 'antd'

export const REDUCER = 'user'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const userApi = `${api.host}/${api.user}`

export const setUserPage = createAction(`${NS}SET_USER_PAGE`)
export const createUserState = createAction(`${NS}CREATE_USER`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (dispatch, getState) => {
  axios
    .get(userApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      if (response && response.data) {
        let { users, page, totalItems } = response.data
        if (!totalItems || totalItems === 0) {
          totalItems = users.length
        }
        if (!users) {
          users = { customer: {}, groups: {} }
        }
        dispatch(setUserPage({ users, page, totalItems }))
      }
    })
    .catch(error => {
      let errorMessage = 'get user fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock user
      const { users } = require('../reducers/mock')
      dispatch(setUserPage(users))
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios.patch(`${userApi}/${id}`, { active: status }).then(response => {
    if (response && response.data) {
      let { users, page, totalItems } = getState().user
      if (users && Array.isArray(users) && users.length > 0) {
        let user = users.find(x => x.id === response.data.id)
        if (user) {
          user = response.data
          dispatch(setUserPage({ users, page, totalItems }))
        }
      }
    }
  }).catch(error => {
    let errorMessage = 'change user status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
  })
}
export const createUser = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createUserState(model))
  if(isCreate){

  }
}
const initialState = {
  totalItems: 0,
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
        id: -1,
        image: {
          created_at: '2018-12-04T10:29:14.705Z',
          deleted_at: '2018-12-04T10:29:14.705Z',
          id: -1,
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
            id: -1,
            image: {
              created_at: '2018-12-04T10:29:14.705Z',
              deleted_at: '2018-12-04T10:29:14.705Z',
              id: -1,
              path: 'string',
              updated_at: '2018-12-04T10:29:14.705Z',
            },
            last_name: 'string',
            mobile: 'string',
            updated_at: '2018-12-04T10:29:14.705Z',
          },
          deleted_at: '2018-12-04T10:29:14.705Z',
          id: -1,
          name: 'string',
          updated_at: '2018-12-04T10:29:14.705Z',
          users: [null],
          uuid: 'string',
        },
      ],
      id: -1,
      last_login: '2018-12-04T10:29:14.705Z',
      last_password_change: '2018-12-04T10:29:14.705Z',
      role: {
        access_level: 0,
        id: -1,
        name: 'string',
      },
      updated_at: '2018-12-04T10:29:14.705Z',
      username: 'string',
      uuid: 'string',
    },
  ],
}
const ACTION_HANDLES = {
  [setUserPage]: (state, { users, page, totalItems }) => ({ ...state, users, page, totalItems }),
  [createUserState]: (state, userCreate) => ({ ...state, userCreate }),
}
export default createReducer(ACTION_HANDLES, initialState)
