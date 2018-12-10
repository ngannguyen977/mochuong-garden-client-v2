import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { push } from 'react-router-redux'
import { notification } from 'antd'

export const REDUCER = 'group'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const groupApi = `${api.host}/${api.group}`

export const setGroupPage = createAction(`${NS}SET_USER_PAGE`)
export const createGroupState = createAction(`${NS}CREATE_USER`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (dispatch, getState) => {
  axios
    .get(groupApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      if (response && response.data) {
        let { groups, page, totalItems } = response.data
        if (!totalItems || totalItems === 0) {
          totalItems = groups.length
        }
        if (!groups) {
          groups = { customer: {}, users: {} }
        }
        dispatch(setGroupPage({ groups, page, totalItems }))
      }
    })
    .catch(error => {
      let errorMessage = 'get group fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios.patch(`${groupApi}/${id}`, { active: status }).then(response => {
    if (response && response.data) {
      let { groups, page, totalItems } = getState().group
      if (groups && Array.isArray(groups) && groups.length > 0) {
        let group = groups.find(x => x.id === response.data.id)
        if (group) {
          group = response.data
          dispatch(setGroupPage({ groups, page, totalItems }))
        }
      }
    }
  }).catch(error => {
    let errorMessage = 'change group status fail'
    if (error.response && error.response.data) {
      errorMessage = error.response.data
    }
    message.error(errorMessage)
  })
}
export const createGroup = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createGroupState(model))
}
const initialState = {
  totalItems: 0,
  page: 0,
  groups: null,
}
const ACTION_HANDLES = {
  [setGroupPage]: (state, { groups, page, totalItems }) => ({ ...state, groups, page, totalItems }),
  [createGroupState]: (state, groupCreate) => ({ ...state, groupCreate }),
}
export default createReducer(ACTION_HANDLES, initialState)
