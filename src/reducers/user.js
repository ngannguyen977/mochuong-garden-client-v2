import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { createUserPolicy } from '../services/policy'
import { setPermissionPerGroup } from 'reducers/permission'

export const REDUCER = 'user'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const userApi = `${api.host}/${api.user}`

export const setUserPage = createAction(`${NS}SET_USER_PAGE`)
export const setUserDetailPage = createAction(`${NS}SET_USER_DETAIL_PAGE`)
export const createUserState = createAction(`${NS}CREATE_USER`)
export const getUsersInGroup = createAction(`${NS}GET_USERS_GROUP`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(userApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      if (response && response.data) {
        let { users, page, totalItems } = response.data
        if (!totalItems || totalItems === 0) {
          totalItems = users.length
        }
        if (!users) {
          users = { customer: {}, groups: [] }
        }
        dispatch(setUserPage({ users, page, totalItems }))
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get user fail'
      message.error(errorMessage)
    })
}
export const getUsersByGroup = groupId => (dispatch, getState) => {
  axios
    .get(`${userApi}/${api.usersByGroup}/${groupId}`)
    .then(response => {
      if (response && response.data) {
        const { users, page, totalItems } = response.data

        dispatch(getUsersInGroup({ users, page, totalItems, groupId }))
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get user fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${userApi}/${id}`)
    .then(response => {
      if (response && response.data) {
        dispatch(setUserDetailPage(response.data))
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get user fail'
      message.error(errorMessage)
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios
    .patch(`${userApi}/${id}`, { active: status })
    .then(response => {
      if (response && response.data) {
        let { users, page, totalItems } = getState().user
        if (users && Array.isArray(users) && users.length > 0) {
          let user = users.find(x => x.id === response.data.id)
          if (user) {
            user = response.data
            dispatch(setUserPage({ users, page, totalItems }))
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
      let errorMessage = ((error.response || {}).data || {}).message || 'change status user fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${userApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete user success!',
        description:
          'These users will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.',
      })
      let { users, page, totalItems } = getState().user
      dispatch(
        setUserPage({
          users: users.filter(user => !ids.includes(user.id)),
          page,
          totalItems: totalItems - ids.length,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete user fail'
      message.error(errorMessage)
    })
}
export const changePassword = (id, model) => (dispatch, getState) => {
  let _model = {
    new_password: model.newPassword,
    new_password_confirm: model.confirm,
    old_password: model.oldPassword,
  }
  axios
    .patch(`${userApi}/${id}/password`, _model)
    .then(response => {
      notification['success']({
        message: 'Update user success!',
        description:
          'The password of this user is changed successfully!.Now, this user can login with new password!',
      })
      let { groups, page, totalItems } = getState().group
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
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createUserState(model))
  if (isCreate) {
    let _model = {
      group_ids: model.groups,
      password: model.password,
      password_confirm: model.confirm,
      username: model.username,
    }
    axios
      .post(userApi, _model)
      .then(response => {
        let { users, page, totalItems } = getState().user
        users.push(response.data)
        dispatch(setUserPage({ users, page, totalItems: totalItems++ }))
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          createUserPolicy(response.data.id, {
            policyIds: model.permissions.map(x => x.policyId).join(),
          })
            .then(message.success('attach permission success'))
            .catch(error => {
              let errorMessage =
                ((error.response || {}).data || {}).message ||
                `create permission for user ${model.username} fail`
              message.error(errorMessage)
            })
        }
        dispatch(createUserState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create user fail'
        message.error(errorMessage)
      })
  }
  dispatch(setPermissionPerGroup(null))
}
const initialState = {
  totalItems: -1,
  page: 0,
  users: [],
}
const ACTION_HANDLES = {
  [setUserPage]: (state, { users, page, totalItems }) => ({ ...state, users, page, totalItems }),
  [createUserState]: (state, userCreate) => ({ ...state, userCreate }),
  [setUserDetailPage]: (state, detail) => ({ ...state, detail }),
  [getUsersInGroup]: (state, users) => {
    const { usersInGroup } = state
    if (!usersInGroup.find(x => x.groupId === users.groupId)) {
      usersInGroup.push(users)
    }
    return usersInGroup
  },
}
export default createReducer(ACTION_HANDLES, initialState)
