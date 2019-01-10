import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { getServices, getActions } from '../services/resource'
import { getPermissions as getPolicyFromUser, updateUserState } from 'reducers/user'
import { getPermissions as getPolicyFromGroup, updateGroupState } from 'reducers/group'
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

export const REDUCER = 'policy'

const NS = `@@${REDUCER}/`

export const setPolicyPage = createAction(`${NS}SET_POLICY_PAGE`)
export const setServiceList = createAction(`${NS}SET_POLICY_SERVICES`)
export const setActionList = createAction(`${NS}SET_POLICY_ACTIONS`)
export const setPolicyDetailPage = createAction(`${NS}SET_POLICY_DETAIL_PAGE`)
export const createPolicyState = createAction(`${NS}CREATE_POLICY_STATE`)
export const updatePolicyState = createAction(`${NS}UPDATE_POLICY_STATE`)
export const setPolicyPerGroup = createAction(`${NS}SET_POLICY_GROUP_STATE`)

export const getList = (keyword, keysort, types, skip = 0, limit = 10, isAsc = false) => (
  dispatch,
  getState,
) => {
  getPolicies(keyword, keysort, types, skip, limit, isAsc)
    .then(response => {
      let { records, page, total } = response

      dispatch(setPolicyPage({ policies: records, page, totalItems: total }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get policy fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  getPolicyById(id)
    .then(response => {
      dispatch(setPolicyDetailPage(response))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get policy fail'
      message.error(errorMessage)
    })
}
export const update = (policyId, model, isUpdate) => (dispatch, getState) => {
  dispatch(updatePolicyState(model))
  console.log('update', model)
  if (isUpdate) {
    updatePolicy(policyId, model)
      .then(response => {
        let { policies, page, totalItems } = getState().policy
        policies = policies.filter(x => x.policyId !== response.policyId)
        policies.push(response)
        dispatch(setPolicyPage({ policies, page, totalItems }))
        dispatch(setPolicyDetailPage(response))
        dispatch(updatePolicyState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'update policy fail'
        message.error(errorMessage)
      })
  }
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createPolicyState(model))
  console.log(model)
  if (isCreate) {
    let _model = {
      name: model.name,
      description: model.description,
      resourceTypes: model.resources.map(x => ({
        name: x.type,
        effect: x.isAllowPolicy ? 'Allow' : 'Deny',
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
        let { policies, page, totalItems } = getState().policy
        policies.push(response)
        dispatch(setPolicyPage({ policies, page, totalItems: totalItems++ }))
        dispatch(createPolicyState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create policy fail'
        message.error(errorMessage)
      })
  }
}
export const destroy = ids => (dispatch, getState) => {
  deletePolicy(ids)
    .then(response => {
      notification['success']({
        message: 'Delete policy success!',
        description:
          'These policies will be delete permanly shortly in 1 month. In that time, if you re-create these policy, we will revert information for them.',
      })
      let { policies, page, totalItems } = getState().policy
      dispatch(
        setPolicyPage({
          policies: policies.filter(x => !ids.includes(x.policyId)),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete policy fail'
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
      dispatch(setPolicyPerGroup(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list policy by group fail'
      message.error(errorMessage)
    })
}
export const getByGroup = groupId => (dispatch, getState) => {
  getPolicyByGroup(groupId)
    .then(response => {
      dispatch(getPolicies(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list policy by group fail'
      message.error(errorMessage)
    })
}
export const getByUser = userId => (dispatch, getState) => {
  getPolicyByUser(userId)
    .then(response => {
      dispatch(getPolicy(response))
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || 'get list policy by user fail'
      message.error(errorMessage)
    })
}
export const changePoliciesForUser = (policyIds, userUuid, isChange) => (dispatch, getState) => {
  console.log('change policy for user in group reducer', policyIds, userUuid, isChange)
  dispatch(updateUserState({ userUuid, policies: policyIds }))
  if (isChange) {
    // get current users in this group, then compare the list to detect add or remove
    updateUserPolicies(userUuid, policyIds.join())
      .then(response => {
        dispatch(updateUserState({ userUuid, policies: [] }))
      })
      .catch(error => {
        let errorMessage =
          ((error.response || {}).data || {}).message || 'change groups for user fail'
        message.error(errorMessage)
      })
  }
}
export const changePoliciesForGroup = (policyIds, groupUuid, isChange) => (dispatch, getState) => {
  console.log('change policy for group in group reducer', policyIds, groupUuid, isChange)
  dispatch(updateGroupState({ groupUuid, policies: policyIds }))
  if (isChange) {
    // get current groups in this group, then compare the list to detect add or remove
    updateGroupPolicies(groupUuid, policyIds.join())
      .then(response => {
        dispatch(updateGroupState({ groupUuid, policies: [] }))
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
  policies: [],
}
const ACTION_HANDLES = {
  [setPolicyPage]: (state, { policies, page, totalItems }) => ({
    ...state,
    policies,
    page,
    totalItems,
  }),
  [setPolicyDetailPage]: (state, detail) => ({ ...state, detail }),
  [createPolicyState]: (state, policyCreate) => ({ ...state, policyCreate }),
  [updatePolicyState]: (state, policyUpdate) => ({ ...state, policyUpdate }),
  [setServiceList]: (state, services) => ({ ...state, services }),
  [setActionList]: (state, { shortName, actions }) => ({
    ...state,
    shortName: shortName,
    actions: actions,
  }),
  [setPolicyPerGroup]: (state, policies) => ({
    ...state,
    userCreatePolicy: policies,
  }),
  [getPolicyByUser]: (state, policies) => ({ ...state, userPolicy: policies }),
}
export default createReducer(ACTION_HANDLES, initialState)
