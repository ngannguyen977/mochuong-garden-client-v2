import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { getServices, getActions } from '../services/resource'
import { createPolicy, getPolicies, deletePolicy, updatePolicy, getPolicyById } from '../services/policy'

export const REDUCER = 'permission'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const permissionApi = `${api.host}/${api.permission}`

export const setPermissionPage = createAction(`${NS}SET_PERMISSION_PAGE`)
export const setServiceList = createAction(`${NS}SET_SERVICES`)
export const setActionList = createAction(`${NS}SET_ACTIONS`)
export const setPermissionDetailPage = createAction(`${NS}SET_PERMISSION_DETAIL_PAGE`)
export const createPermissionState = createAction(`${NS}CREATE_PERMISSION_STATE`)
export const createPermission = createAction(`${NS}CREATE_PERMISSION`)
export const updatePermissionState = createAction(`${NS}UPDATE_PERMISSION_STATE`)

export const getList = (keyword, keysort, types, skip = 0, limit = 10, isAsc = false) => (
  dispatch,
  getState,
) => {
  getPolicies(keyword, keysort, types, skip, limit, isAsc)
    .then(response => {
      let { records, page, total } = response

      dispatch(setPermissionPage({ permissions: records, page, totalItems: total }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get permission fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  getPolicyById(id)
    .then(response => {
      dispatch(setPermissionDetailPage(response))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get permission fail'
      message.error(errorMessage)
    })
}
export const update = (policyId, model, isUpdate) => (dispatch, getState) => {
  dispatch(updatePermissionState(model))
  console.log('update', model)
  if (isUpdate) {
    updatePolicy(policyId, model)
      .then(response => {
        let { permissions, page, totalItems } = getState().permission
        permissions = permissions.filter(x => x.policyId !== response.policyId)
        permissions.push(response)
        dispatch(setPermissionPage({ permissions, page, totalItems }))
        dispatch(setPermissionDetailPage(response))
        dispatch(updatePermissionState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'update permission fail'
        message.error(errorMessage)
      })
  }
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createPermissionState(model))
  console.log(model)
  if (isCreate) {
    let _model = {
      name: model.name,
      description: model.description,
      resourceTypes: model.resources.map(x => ({
        name: x.type,
        effect: x.isAllowPermission ? 'allow' : 'deny',
        actions: model.actions.filter(a => a.resourceType === x.type).map(a => a.name),
        resources: x.value.split(',')
      }))
    }

    let { userState } = getState().app
    createPolicy(userState.userId || -258, _model)
      .then(response => {
        let { permissions, page, totalItems } = getState().permission
        permissions.push(response)
        dispatch(setPermissionPage({ permissions, page, totalItems: totalItems++ }))
        dispatch(createPermissionState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create permission fail'
        message.error(errorMessage)
      })
  }
}
export const destroy = ids => (dispatch, getState) => {
  deletePolicy(ids)
    .then(response => {
      notification['success']({
        message: 'Delete permission success!',
        description:
          'These permisions will be delete permanly shortly in 1 month. In that time, if you re-create these permission, we will revert information for them.',
      })
      let { permissions, page, totalItems } = getState().permission
      dispatch(setPermissionPage({ permissions: permissions.filter(x => !ids.includes(x.policyId)), page, totalItems: totalItems-- }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete permission fail'
      message.error(errorMessage)
    })
}
export const getListService = (keyword, keysort, skip, count, orderDescending) => (dispatch, getState) => {
  getServices(keyword, keysort, skip, count, orderDescending)
    .then(response => {
      dispatch(setServiceList(response))
      notification['success']({
        message: 'Get list services success!',
        description:
          'Get list services successfully. Please choose a service to get list actions itself.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get list service fail'
      message.error(errorMessage)
    })
}
export const getListActionOfService = (shortName) => (dispatch, getState) => {
  getActions(shortName)
    .then(response => {
      dispatch(setActionList({ shortName, actions: response }))
      notification['success']({
        message: 'Get list actions of service success!',
        description:
          'Get list actions of service successfully. Please choose a service to get list actions itself.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get list actions by service fail'
      message.error(errorMessage)
    })
}
const initialState = {
  totalItems: 0,
  page: 0,
  permissions: []
}
const ACTION_HANDLES = {
  [setPermissionPage]: (state, { permissions, page, totalItems }) => ({
    ...state,
    permissions,
    page,
    totalItems,
  }),
  [setPermissionDetailPage]: (state, detail) => ({ ...state, detail }),
  [createPermissionState]: (state, permissionCreate) => ({ ...state, permissionCreate }),
  [updatePermissionState]: (state, permissionUpdate) => ({ ...state, permissionUpdate }),
  [setServiceList]: (state, services) => ({ ...state, services }),
  [setActionList]: (state, { shortName, actions }) => ({ ...state, shortName: shortName, actions: actions }),
}
export default createReducer(ACTION_HANDLES, initialState)
