import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { push } from 'react-router-redux'
import { notification } from 'antd'

export const REDUCER = 'permission'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const permissionApi = `${api.host}/${api.permission}`

export const setPermissionPage = createAction(`${NS}SET_USER_PAGE`)
export const createPermissionState = createAction(`${NS}CREATE_USER`)

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
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios.patch(`${permissionApi}/${id}`, { active: status }).then(response => {
    if (response && response.data) {
      let { permissions, page, totalItems } = getState().permission
      if (permissions && Array.isArray(permissions) && permissions.length > 0) {
        let permission = permissions.find(x => x.id === response.data.id)
        if (permission) {
          permission = response.data
          dispatch(setPermissionPage({ permissions, page, totalItems }))
        }
      }
    }
  }).catch(error => {
    let errorMessage = 'change permission status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
  })
}
export const createPermission = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createPermissionState(model))
  if(isCreate){

  }
}
const initialState = {
  totalItems: 0,
  page: 0,
  permissions: [

  ],
}
const ACTION_HANDLES = {
  [setPermissionPage]: (state, { permissions, page, totalItems }) => ({ ...state, permissions, page, totalItems }),
  [createPermissionState]: (state, permissionCreate) => ({ ...state, permissionCreate }),
}
export default createReducer(ACTION_HANDLES, initialState)
