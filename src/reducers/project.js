import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'

export const REDUCER = 'project'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const projectApi = `${api.host}/${api.project}`

export const setProjectPage = createAction(`${NS}SET_PROJECT_PAGE`)
export const setProjectDetailPage = createAction(`${NS}SET_PROJECT_DETAIL_PAGE`)
export const createProjectState = createAction(`${NS}CREATE_PROJECT`)
export const updateProjectState = createAction(`${NS}UPDATE_PROJECT`)
export const getProjectsInGroup = createAction(`${NS}GET_PROJECTS_GROUP`)
export const getPermission = createAction(`${NS}GET_PROJECT_PERMISSION`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(projectApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { projects, page, totalItems } = response.data
      dispatch(setProjectPage({ projects, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get project list fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${projectApi}/${id}`)
    .then(response => {
      dispatch(setProjectDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get project fail'
      message.error(errorMessage)
    })
}
export const create = (name, description) => (dispatch, getState) => {
  axios
    .post(projectApi, { name, description })
    .then(response => {
      notification['success']({
        message: 'Create project success!',
        description:
          'The project was created successfully!',
      })
      dispatch(push('/projects'))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create project fail'
      message.error(errorMessage)
    })
}
export const update = (id, name, description) => (dispatch, getState) => {
  axios
    .patch(`${projectApi}/${id}`, { name, description })
    .then(response => {
      notification['success']({
        message: 'Update project success!',
        description:
          'The project was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create project fail'
      message.error(errorMessage)
    })
}
export const remove = id => (dispatch, getState) => {
  axios
    .delete(`${projectApi}?ids=${id}`)
    .then(response => {
      let { projects, page, totalItems } = getState().project
      projects = projects.filter(x => x.id !== id)
      totalItems -=1
      dispatch(setProjectPage({ projects, page, totalItems }))
      notification['success']({
        message: 'Delete project success!',
        description:
          'The project was permanly deleted.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete project fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  console.log('xxxxxxxxxxxxxxxxxxx', ids)
  axios
    .delete(`${projectApi}?ids=${ids}`)
    .then(response => {
      let { projects, page, totalItems } = getState().project
      let listId = ids.split(',')
      console.log('project', projects, listId)
      projects = projects.filter(x => !listId.includes(x.id))
      totalItems -= listId.length
      dispatch(setProjectPage({ projects, page, totalItems }))
      notification['success']({
        message: 'Delete project success!',
        description:
          'The project was permanly deleted.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete project fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  projects: [],
}
const ACTION_HANDLES = {
  [setProjectPage]: (state, { projects, page, totalItems }) => ({
    ...state,
    projects,
    page,
    totalItems,
  }),
  [createProjectState]: (state, projectCreate) => ({ ...state, projectCreate }),
  [updateProjectState]: (state, projectUpdate) => {
    return { ...state, detail: { ...state.detail, projectUpdate } }
  },
  [setProjectDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getProjectsInGroup]: (state, projectsInGroup) => ({ ...state, projectsInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
