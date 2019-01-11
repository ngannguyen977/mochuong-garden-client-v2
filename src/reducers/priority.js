import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'

export const REDUCER = 'priority'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const priorityApi = `${api.host}/${api.priority}`

export const setPriorityPage = createAction(`${NS}SET_PRIORITY_PAGE`)
export const setPriorityDetailPage = createAction(`${NS}SET_PRIORITY_DETAIL_PAGE`)
export const createPriorityState = createAction(`${NS}CREATE_PRIORITY`)
export const updatePriorityState = createAction(`${NS}UPDATE_PRIORITY`)
export const getPrioritiesInGroup = createAction(`${NS}GET_PRIORITYS_GROUP`)
export const getPermission = createAction(`${NS}GET_PRIORITY_PERMISSION`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(priorityApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { priorities, page, totalItems } = response.data
      dispatch(setPriorityPage({ priorities, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get priority list fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${priorityApi}/${id}`)
    .then(response => {
      dispatch(setPriorityDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get priority fail'
      message.error(errorMessage)
    })
}
export const create = (name, description, color, project) => (dispatch, getState) => {
  axios
    .post(priorityApi, { name, description, color, project })
    .then(response => {
      notification['success']({
        message: 'Create priority success!',
        description: 'The priority was created successfully!',
      })
      dispatch(push('/priorities'))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create priority fail'
      message.error(errorMessage)
    })
}
export const update = (id, name, description) => (dispatch, getState) => {
  axios
    .patch(`${priorityApi}/${id}`, { name, description })
    .then(response => {
      notification['success']({
        message: 'Update priority success!',
        description: 'The priority was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create priority fail'
      message.error(errorMessage)
    })
}
export const remove = id => (dispatch, getState) => {
  axios
    .delete(`${priorityApi}?ids=${id}`)
    .then(response => {
      let { priorities, page, totalItems } = getState().priority
      priorities = priorities.filter(x => x.id !== id)
      totalItems -= 1
      dispatch(setPriorityPage({ priorities, page, totalItems }))
      notification['success']({
        message: 'Delete priority success!',
        description: 'The priority was permanly deleted.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete priority fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${priorityApi}?ids=${ids}`)
    .then(response => {
      let { priorities, page, totalItems } = getState().priority
      priorities = priorities.filter(x => !ids.includes(x.id))
      totalItems -= ids.length
      dispatch(setPriorityPage({ priorities, page, totalItems }))
      notification['success']({
        message: 'Delete priority success!',
        description: 'The priority was permanly deleted.',
      })
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || 'delete priority fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  priorities: [],
}
const ACTION_HANDLES = {
  [setPriorityPage]: (state, { priorities, page, totalItems }) => ({
    ...state,
    priorities,
    page,
    totalItems,
  }),
  [createPriorityState]: (state, priorityCreate) => ({ ...state, priorityCreate }),
  [updatePriorityState]: (state, priorityUpdate) => {
    return { ...state, detail: { ...state.detail, priorityUpdate } }
  },
  [setPriorityDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getPrioritiesInGroup]: (state, prioritiesInGroup) => ({ ...state, prioritiesInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
