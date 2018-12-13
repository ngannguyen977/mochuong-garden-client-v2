import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'

export const REDUCER = 'group'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const groupApi = `${api.host}/${api.group}`

export const setGroupPage = createAction(`${NS}SET_GROUP_PAGE`)
export const setGroupDetailPage = createAction(`${NS}SET_GROUP_DETAIL_PAGE`)
export const createGroupState = createAction(`${NS}CREATE_GROUP`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
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
      // mock groups
      const { groups } = require('../reducers/mock')
      dispatch(setGroupPage(groups))
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${groupApi}/${id}`)
    .then(response => {
      if (response && response.data) {
        dispatch(setGroupDetailPage(response.data))
      }
    })
    .catch(error => {
      let errorMessage = 'get group fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock user
      const { groups } = require('../reducers/mock')
      dispatch(setGroupDetailPage(groups[0]))
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios
    .patch(`${groupApi}/${id}`, { active: status })
    .then(response => {
      if (response && response.data) {
        let { groups, page, totalItems } = getState().group
        if (groups && Array.isArray(groups) && groups.length > 0) {
          let group = groups.find(x => x.id === response.data.id)
          if (group) {
            group = response.data
            dispatch(setGroupPage({ groups, page, totalItems }))
            notification['success']({
              message: 'Change status of users success!',
              description:
                'Users status are updated. When users was left their job, you will remove them by delete users button or just deactive these users.',
            })
          }
        }
      }
    })
    .catch(error => {
      let errorMessage = 'change group status fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createGroupState(model))
  if (isCreate) {
    axios
      .post(groupApi, model)
      .then(response => {
        if (response && response.data) {
          let { users, page, totalItems } = getState().user
          users.push(response.data)
          dispatch(setGroupPage({ users, page, totalItems: totalItems++ }))
        }
        dispatch(createGroupState({}))
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
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${groupApi}/${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete group success!',
        description:
          'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these group, we will revert information for them.',
      })
      let { groups } = getState().group
      dispatch(setGroupPage(groups.filter(group => !ids.includes(group.id))))
    })
    .catch(error => {
      let errorMessage = 'change group status fail'
      if (error.response && error.response.data) {
        errorMessage = error.response.data
      }
      message.error(errorMessage)
      // mock
      notification['success']({
        message: 'Delete group success!',
        description:
          'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.',
      })
    })
}
const initialState = {
  totalItems: 0,
  page: 0,
  groups: [],
  groupCreate: {},
  detail: {},
}
const ACTION_HANDLES = {
  [setGroupPage]: (state, { groups, page, totalItems }) => ({ ...state, groups, page, totalItems }),
  [setGroupDetailPage]: (state, detail) => ({ ...state, detail }),
  [createGroupState]: (state, groupCreate) => ({ ...state, groupCreate }),
}
export default createReducer(ACTION_HANDLES, initialState)
