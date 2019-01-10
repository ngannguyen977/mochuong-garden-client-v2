import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { getServices, getActions } from '../services/resource'
import { getPermission, updateUserState } from 'reducers/user'
import { getPermissions, updateGroupState } from 'reducers/group'
import { setUserState } from 'reducers/app'
import {
  createPolicy,
  getPolicies,
  deletePolicy,
  updatePolicy,
  getPolicyById,
  getPolicyByGroup,
  getPolicyByGroups,
  getPolicyByUser,
  updateUserPolicies,
  updateGroupPolicies,
} from '../services/policy'

export const REDUCER = 'permission'

const NS = `@@${REDUCER}/`

export const setPermissionPage = createAction(`${NS}SET_PERMISSION_PAGE`)
export const setServiceList = createAction(`${NS}SET_SERVICES`)
export const setActionList = createAction(`${NS}SET_ACTIONS`)
export const setPermissionDetailPage = createAction(`${NS}SET_PERMISSION_DETAIL_PAGE`)
export const createPermissionState = createAction(`${NS}CREATE_PERMISSION_STATE`)
export const createPermission = createAction(`${NS}CREATE_PERMISSION`)
export const updatePermissionState = createAction(`${NS}UPDATE_PERMISSION_STATE`)
export const setPermissionPerGroup = createAction(`${NS}SET_PERMISSION_GROUP_STATE`)
export const getPermissionByUser = createAction(`${NS}GET_PERMISSION_USER_STATE`)

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
        effect: x.isAllowPermission ? 'Allow' : 'Deny',
        actions: model.actions.filter(a => a.resourceType === x.type).map(a => a.name),
        resources: x.value.split(','),
      })),
    }

    let { userState } = getState().app
    if (!userState.id) {
      userState = JSON.parse(window.localStorage.getItem('app.userState'))
    }
    createPolicy(userState.id, _model)
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
          'These permissions will be delete permanly shortly in 1 month. In that time, if you re-create these permission, we will revert information for them.',
      })
      let { permissions, page, totalItems } = getState().permission
      dispatch(
        setPermissionPage({
          permissions: permissions.filter(x => !ids.includes(x.policyId)),
          page,
          totalItems: (totalItems -= ids.length),
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete permission fail'
      message.error(errorMessage)
    })
}
export const getListService = (keyword, keysort, skip, count, orderDescending) => (
  dispatch,
  getState,
) => {
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
export const getListActionOfService = shortName => (dispatch, getState) => {
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
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list actions by service fail'
      message.error(errorMessage)
    })
}
export const getByGroups = groupIds => (dispatch, getState) => {
  getPolicyByGroup(groupIds)
    .then(response => {
      dispatch(setPermissionPerGroup(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list permission by group fail'
      message.error(errorMessage)
    })
}
export const getByGroup = groupId => (dispatch, getState) => {
  getPolicyByGroup(groupId)
    .then(response => {
      dispatch(getPermissions(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list permission by group fail'
      message.error(errorMessage)
    })
}
export const getByUser = userId => (dispatch, getState) => {
  getPolicyByUser(userId)
    .then(response => {
      dispatch(getPermission(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list permission by user fail'
      message.error(errorMessage)
    })
}
export const changePermissionsForUser = (permissionIds, userUuid, isChange) => (
  dispatch,
  getState,
) => {
  console.log('change permission for user in group reducer', permissionIds, userUuid, isChange)
  dispatch(updateUserState({ userUuid, permissions: permissionIds }))
  if (isChange) {
    // get current users in this group, then compare the list to detect add or remove
    updateUserPolicies(userUuid, permissionIds.join())
      .then(response => {
        dispatch(updateUserState({ userUuid, permissions: [] }))
      })
      .catch(error => {
        let errorMessage =
          ((error.response || {}).data || {}).message || 'change groups for user fail'
        message.error(errorMessage)
      })
  }
}
export const changePermissionsForGroup = (permissionIds, groupUuid, isChange) => (
  dispatch,
  getState,
) => {
  console.log('change permission for group in group reducer', permissionIds, groupUuid, isChange)
  dispatch(updateGroupState({ groupUuid, permissions: permissionIds }))
  if (isChange) {
    // get current groups in this group, then compare the list to detect add or remove
    updateGroupPolicies(groupUuid, permissionIds.join())
      .then(response => {
        dispatch(updateGroupState({ groupUuid, permissions: [] }))
      })
      .catch(error => {
        let errorMessage =
          ((error.response || {}).data || {}).message || 'change groups for group fail'
        message.error(errorMessage)
      })
  }
}
const initialState = {
  totalItems: -1,
  page: 0,
  permissions: [],
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
  [setActionList]: (state, { shortName, actions }) => ({
    ...state,
    shortName: shortName,
    actions: actions,
  }),
  [setPermissionPerGroup]: (state, permissions) => ({
    ...state,
    userCreatePermission: permissions,
  }),
  [getPermissionByUser]: (state, permissions) => ({ ...state, userPermission: permissions }),
}
export default createReducer(ACTION_HANDLES, initialState)
