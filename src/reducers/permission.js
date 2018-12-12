import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'


export const REDUCER = 'permission'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const permissionApi = `${api.host}/${api.permission}`

export const setPermissionPage = createAction(`${NS}SET_PERMISSION_PAGE`)
export const setPermissionDetailPage = createAction(`${NS}SET_PERMISSION_DETAIL_PAGE`)
export const createPermissionState = createAction(`${NS}CREATE_PERMISSION`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (dispatch, getState) => {
  axios
    .get(permissionApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      if (response && response.data) {
        let { permissions, page, totalItems } = response.data
        if (!totalItems || totalItems === 0) {
          totalItems = permissions.length
        }
        if (!permissions) {
          permissions = { customer: {}, groups: {} }
        }
        dispatch(setPermissionPage({ permissions, page, totalItems }))
      }
    })
    .catch(error => {
      let errorMessage = 'get permission fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock groups
      const { permissions } = require('../reducers/mock')
      dispatch(setPermissionPage(permissions))
    })
}
export const getOne = (id) => (dispatch, getState) => {
  axios
    .get(`${permissionApi}/${id}`)
    .then(response => {
      if (response && response.data) {
        dispatch(setPermissionDetailPage(response.data))
      }
    })
    .catch(error => {
      let errorMessage = 'get group fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock user
      const { permission } = require('../reducers/mock')
      dispatch(setPermissionDetailPage(permission[0]))
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createPermissionState(model))
  if (isCreate) {
    axios
      .post(permissionApi, model)
      .then(response => {
        if (response && response.data) {
          let { users, page, totalItems } = getState().user
          users.push(response.data)
          dispatch(setPermissionPage({ users, page, totalItems: totalItems++ }))
        }
        dispatch(createPermissionState({}))
      })
      .catch(error => {
        let errorMessage = 'create permission fail'
        if (error.response && error.response.data) {
          errorMessage = error.response.data
        }
        message.error(errorMessage)
      })
  }
}
export const destroy = (ids) => (dispatch, getState) => {
  axios.delete(`${permissionApi}/${ids}`).then(response => {
    notification['success']({
      message: 'Delete group success!',
      description: 'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these group, we will revert information for them.',
    })
    let { groups } = getState().group
    dispatch(setPermissionPage(groups.filter((group) => !ids.includes(group.id))))
  }).catch(error => {
    let errorMessage = 'change group status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
    // mock
    notification['success']({
      message: 'Delete permission success!',
      description: 'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.',
    })
  })
}
const initialState = {
  totalItems: 0,
  page: 0,
  permissions: [

  ],
}
const ACTION_HANDLES = {
  [setPermissionPage]: (state, { permissions, page, totalItems }) => ({ ...state, permissions, page, totalItems }),
  [setPermissionDetailPage]: (state, detail) => ({ ...state, detail }),
  [createPermissionState]: (state, permissionCreate) => ({ ...state, permissionCreate }),
}
export default createReducer(ACTION_HANDLES, initialState)
