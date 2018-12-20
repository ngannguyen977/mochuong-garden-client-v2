import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import {
  createGroupPolicy
} from '../services/policy'
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
      let { groups, page, totalItems } = response.data
      if (!groups) {
        groups = []
      }
      dispatch(setGroupPage({ groups, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get groups fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${groupApi}/${id}`)
    .then(response => {
      dispatch(setGroupDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get groups fail'
      message.error(errorMessage)
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
      let errorMessage = ((error.response || {}).data || {}).message || 'change status groups fail'
      message.error(errorMessage)
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createGroupState(model))
  if (isCreate) {
    axios
      .post(groupApi, { name: model.name })
      .then(response => {

        let { users, page, totalItems } = getState().user
        users.push(response.data)
        dispatch(setGroupPage({ users, page, totalItems: totalItems++ }))
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          createGroupPolicy(response.data.id, { policyIds: model.permissions.map(x => x.policyId).join() }).then(
            message.success('attach permission success')
          ).catch(error => {
            let errorMessage = ((error.response || {}).data || {}).message || `create permission for user ${model.username} fail`
            message.error(errorMessage)
          })
          // todo: add users to group
        }
        dispatch(createGroupState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create groups fail'
        message.error(errorMessage)
      })
  }
}
export const update = (id, model, isUpdate) => (dispatch, getState) => {
  let { groups, page, totalItems, detail } = getState().group
  dispatch(setGroupDetailPage({ ...detail, name: model.name }))
  if (isUpdate) {
    axios
      .patch(`${groupApi}/${id}`, { name: model.name })
      .then(response => {
        notification['success']({
          message: 'Update group success!',
          description:
            'These groups is updated successfully!',
        })
        let group = groups.find(x => x.id === response.data.id)
        if (group) {
          group = response.data
        }
        dispatch(setGroupPage({ groups, page, totalItems: totalItems }))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'update groups fail'
        message.error(errorMessage)
      })
  }
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${groupApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete group success!',
        description:
          'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these group, we will revert information for them.',
      })
      let { groups, page, totalItems } = getState().group
      dispatch(setGroupPage({ groups: groups.filter(group => !ids.includes(group.id)), page, totalItems: totalItems - ids.length }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete groups fail'
      message.error(errorMessage)
    })
}
const initialState = {
  totalItems: -1,
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
