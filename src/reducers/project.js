import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { createProjectPolicy } from '../services/policy'
import { setPermissionPerGroup } from 'reducers/permission'

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

export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createProjectState(model))
  if (isCreate) {
    let _model = {
      group_ids: model.groups,
      password: model.password,
      password_confirm: model.confirm,
      projectname: model.projectname,
    }
    axios
      .post(projectApi, _model)
      .then(response => {
        let { projects, page, totalItems } = getState().project
        projects.push(response.data)
        dispatch(setProjectPage({ projects, page, totalItems: totalItems++ }))
        dispatch(createProjectState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create project fail'
        message.error(errorMessage)
      })
  }
  dispatch(setPermissionPerGroup(null))
}

export const update = (model, isChange = false) => (dispatch, getState) => {
  dispatch(updateProjectState(model))
  if (isChange) {
    let _model = {
      group_ids: model.groups,
      password: model.password,
      password_confirm: model.confirm,
      projectname: model.projectname,
    }
    axios
      .post(projectApi, _model)
      .then(response => {
        let { projects, page, totalItems } = getState().project
        projects[response.data.id] = response.data
        dispatch(setProjectPage({ projects, page, totalItems }))
        dispatch(createProjectState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create project fail'
        message.error(errorMessage)
      })
  }
  dispatch(setPermissionPerGroup(null))
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${projectApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete project success!',
        description:
          'These projects will be delete permanly shortly in 1 month. In that time, if you re-create these project, we will revert information for them.',
      })
      let { projects, page, totalItems } = getState().project
      dispatch(
        setProjectPage({
          projects: projects.filter(project => !ids.includes(project.id)),
          page,
          totalItems: totalItems - ids.length,
        }),
      )
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
  [setProjectPage]: (state, { projects, page, totalItems }) => ({ ...state, projects, page, totalItems }),
  [createProjectState]: (state, projectCreate) => ({ ...state, projectCreate }),
  [updateProjectState]: (state, projectUpdate) => {
    console.log('handle action update project', state, projectUpdate)
    return { ...state, detail: { ...state.detail, projectUpdate } }
  },
  [setProjectDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getProjectsInGroup]: (state, projectsInGroup) => ({ ...state, projectsInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
