import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'

export const REDUCER = 'user'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const userApi = `${api.host}/${api.user}`

export const setUserPage = createAction(`${NS}SET_USER_PAGE`)
export const setUserDetailPage = createAction(`${NS}SET_USER_DETAIL_PAGE`)
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
export const getOne = (id) => (dispatch, getState) => {
  axios
    .get(`${userApi}/${id}`)
    .then(response => {
      if (response && response.data) {
        dispatch(setUserDetailPage(response.data))
      }
    })
    .catch(error => {
      let errorMessage = 'get user fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock user
      const { user } = require('../reducers/mock')
      dispatch(setUserDetailPage(user))
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
          notification['success']({
            message: 'Change status of users success!',
            description: 'Users status are updated. When users was left their job, you will remove them by delete users button or just deactive these users.',
          })
        }
      }
    }
  }).catch(error => {
    let errorMessage = 'change user status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
    // mock
    notification['success']({
      message: 'Change status of users success!',
      description: 'Users status are updated. When users was left their job, you will remove them by delete users button or just deactive these users.',
    })
  })
}
export const destroy = (ids) => (dispatch, getState) => {
  axios.delete(`${userApi}/${ids}`).then(response => {
    notification['success']({
      message: 'Delete user success!',
      description: 'These users will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.',
    })
    let { users } = getState().user
    dispatch(setUserPage(users.filter((user) => !ids.includes(user.id))))
  }).catch(error => {
    let errorMessage = 'change user status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
    // mock
    notification['success']({
      message: 'Delete user success!',
      description: 'These users will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.',
    })
  })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createUserState(model))
  if (isCreate) {
    axios
      .post(userApi, model)
      .then(response => {
        if (response && response.data) {
          let { users, page, totalItems } = getState().user
          users.push(response.data)
          dispatch(setUserPage({ users, page, totalItems: totalItems++ }))
        }
        dispatch(createUserState({}))
      })
      .catch(error => {
        let errorMessage = 'create user fail'
        if (error.response && error.response.data) {
          errorMessage = error.response.data
        }
        message.error(errorMessage)
      })
  }
}
const initialState = {
  totalItems: 0,
  page: 0,
  users: [],
  userCreate: {},
  detail: {}
}
const ACTION_HANDLES = {
  [setUserPage]: (state, { users, page, totalItems }) => ({ ...state, users, page, totalItems }),
  [createUserState]: (state, userCreate) => ({ ...state, userCreate }),
  [setUserDetailPage]: (state, detail) => ({ ...state, detail })
}
export default createReducer(ACTION_HANDLES, initialState)
