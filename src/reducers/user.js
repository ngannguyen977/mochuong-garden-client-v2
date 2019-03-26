import { createAction, createReducer } from "redux-act"
import { message } from "antd"
import axios from "axios"
import constant from "../config/default"
import { notification } from "antd"
import { createPolicy, getPolicyByUser, getPolicyByName, deletePolicy, deleteUserPolicy } from "../services/policy"
import { getList as getThings, setThingPage } from 'reducers/thing'
import { prepareThingPermission } from "./factory"
import helper from "../helper";

export const REDUCER = "user"

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const userApi = `${api.host}/${api.user}`
const thingApi = `${constant.api.iot.host}/${constant.api.iot.thing}`

export const setUserPage = createAction(`${NS}SET_USER_PAGE`)
export const setUserDetailPage = createAction(`${NS}SET_USER_DETAIL_PAGE`)
export const createUserState = createAction(`${NS}CREATE_USER`)
export const updateUserState = createAction(`${NS}UPDATE_USER`)


export const getAllThing = (
  userUuid,
  username,
  keyword = "",
  limit = 18,
  page = 0,
  sort = "name",
  isAsc = false,
  types = "",
  templateName = "",
  templateType = "",
  onlySelfThing = false
) => async (dispatch, getState) => {
  if (!userUuid) {
    let response = await axios.get(`${userApi}/${username}`)
    dispatch(setUserDetailPage(response.data))
    userUuid = response.data.uuid
  }
  let query = `{pages(key:"${keyword}",templateName:"${templateName}"){page,totalItems, things{name,description,displayName,imageUrl,isActive,serial}}}`

  let thingsPromise = axios.get(`${thingApi}/graphql/search?query=${query}`, {
    params: { limit: limit, page: page, sort: sort, isAsc: isAsc },
  })
  let policiesPromise = getPolicyByUser(userUuid)

  Promise.all([thingsPromise, policiesPromise])
    .then(response => {
      let { things, page, totalItems } = response[0].data.data.pages
      let policies = response[1] || []
      let selfThing = []
      // fill policy
      for (let policy of policies) {
        if (!policy.resourceTypes)
          continue

        let resource = policy.resourceTypes.find(x => x.name === 'things' && x.effect === 'Allow')
        if (!resource)
          continue

        for (let resourceOrn of resource.resources) {
          let thingName = helper.parseResourceOrn(resourceOrn)
          if (!thingName)
            continue

          let thing = things.find(x => x.name === thingName)
          if (!thing)
            continue
          if (!thing.isView && resource.actions.includes('iot:listThing') && resource.actions.includes('iot:readThing')) {
            thing.isView = true
          }
          if (!thing.isControl && resource.actions.includes('iot:controlThing')) {
            thing.isControl = true
          }
          if (onlySelfThing && !selfThing.includes(thing)) {
            selfThing.push(thing)
          }
        }

      }
      if (onlySelfThing) {
        things = selfThing
      }
      dispatch(setThingPage({ things, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get user list fail"
      message.error(errorMessage)
    })
}
export const destroyUserPolicy = (userUuid, thingName) => (dispatch, getState) => {
  let name = `iot-client-${userUuid}-${thingName}`
  let { things, page, totalItems } = getState().thing

  let getControlThingPromise = getPolicyByName(`${name}-control`)
  let getViewThingPromise = getPolicyByName(`${name}-view`)
  Promise.all([getControlThingPromise, getViewThingPromise])
    .then(response => {
      let policyIds = response.map(x => x.policyId)
      deleteUserPolicy(userUuid, policyIds.join(","))
        .then(a => {
          //done
          things = (things || []).filter(x => x.name !== thingName)
          totalItems -= 1
          dispatch(setThingPage({ things, page, totalItems }))
          notification["success"]({
            message: `Delete permission of thing: ${thingName} for this user success!`,
            description:
              "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
          })
        }
        )
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}
export const getPolicyByUserUuid = (uuid, username) => async (
  dispatch,
  getState,
) => {
  console.log(uuid, username)
  try {
    if (!uuid) {
      let user = await axios.get(`${userApi}/${username}`)
      if (user === null) {
        message.error('get user detail fail!')
        return
      }
      uuid = user.data.uuid
    }
    let response = await getPolicyByUser(uuid)
    if (response && response.length > 0) {
      // fill policy
      console.log(response)
    }
  } catch (error) {
    message.error(error.message)
  }
}
export const getList = (limit = 10, page = 0, sort = "name", isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(userApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { users, page, totalItems } = response.data
      dispatch(setUserPage({ users, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get user list fail"
      message.error(errorMessage)
    })
}
export const getOne = username => (dispatch, getState) => {
  axios
    .get(`${userApi}/${username}`)
    .then(response => {
      dispatch(setUserDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get user fail"
      message.error(errorMessage)
    })
}
export const changeStatus = (username, status) => (dispatch, getState) => {
  axios
    .patch(`${userApi}/${username}`, { active: status })
    .then(response => {
      let { users, page, totalItems } = getState().user
      if (users && Array.isArray(users) && users.length > 0) {
        let cName = users.findIndex(x => x.username === response.data.username)
        if (cName) {
          users[(username = cName)] = response.data
          dispatch(setUserPage({ users, page, totalItems }))
          notification["success"]({
            message: "Change status of users success!",
            description:
              "Users status are updated. When users was left their job, you will remove them by delete users button or just deactive these users.",
          })
        }
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "change status user fail"
      message.error(errorMessage)
    })
}
export const changeGroups = (username, groupNames) => (dispatch, getState) => {
  axios
    .patch(`${userApi}/${username}`, { groupNames })
    .then(response => {
      let { users, page, totalItems } = getState().user
      if (users && Array.isArray(users) && users.length > 0) {
        let cName = users.findIndex(x => x.username === response.data.username)
        if (cName) {
          users[(username = cName)] = response.data
          dispatch(setUserPage({ users, page, totalItems }))
          notification["success"]({
            message: "Change groups of this user success!",
            description: "Users groups are update. Please re-check permission for this user.",
          })
        }
      }
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || "change groups for user fail"
      message.error(errorMessage)
    })
}
export const destroy = usernames => (dispatch, getState) => {
  axios
    .delete(`${userApi}?usernames=${usernames}`)
    .then(response => {
      notification["success"]({
        message: "Delete user success!",
        description:
          "These users will be delete permanly shortly in 1 month. In that time, if you re-create these user, we will revert information for them.",
      })
      let { users, page, totalItems } = getState().user
      dispatch(
        setUserPage({
          users: users.filter(user => user.username !== usernames),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "delete user fail"
      message.error(errorMessage)
    })
}
export const changePassword = (name, model) => (dispatch, getState) => {
  let _model = {
    new_password: model.newPassword,
    new_password_confirm: model.confirm,
    old_password: model.oldPassword,
  }
  axios
    .patch(`${userApi}/${name}/password`, _model)
    .then(response => {
      notification["success"]({
        message: "Update user success!",
        description:
          "The password of this user is changed successfully!.Now, this user can login with new password!",
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "update groups fail"
      message.error(errorMessage)
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createUserState(model))
  if (isCreate) {
    let _model = {
      password: model.password,
      passwordConfirm: model.password,
      username: model.username,
    }
    axios
      .post(`${userApi}/client`, _model)
      .then(response => {
        let { users, page, totalItems } = getState().user
        users.push(response.data)
        dispatch(setUserPage({ users, page, totalItems: totalItems++ }))
        console.log(model)
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          //prepare document for create policies
          for (let thing of model.permissions) {
            if (thing.isControl) {
              let document = prepareThingPermission(response.data.uuid, thing.name, "control")
              createPolicy(response.data.uuid, document)
                .then(res => {
                  message.success("Set permission success!")
                  dispatch(createUserState({}))
                })
                .catch(error => {
                  let errorMessage =
                    ((error.response || {}).data || {}).message ||
                    `set permission control for user ${model.username} fail`
                  message.error(errorMessage)
                })
            }
            if (thing.isView) {
              let document = prepareThingPermission(response.data.uuid, thing.name, "view")

              createPolicy(response.data.uuid, document)
                .then(res => {
                  message.success("Set permission success!")
                  dispatch(createUserState({}))
                })
                .catch(error => {
                  let errorMessage =
                    ((error.response || {}).data || {}).message ||
                    `set permission view for user ${model.username} fail`
                  message.error(errorMessage)
                })
            }
          }
        }
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || "create user fail"
        message.error(errorMessage)
      })
  }
}

const initialState = {
  totalItems: -1,
  page: 0,
  users: [],
}
const ACTION_HANDLES = {
  [setUserPage]: (state, { users, page, totalItems }) => ({ ...state, users, page, totalItems }),
  [createUserState]: (state, userCreate) => ({ ...state, userCreate }),
  [updateUserState]: (state, userUpdate) => {
    console.log("handle action update user", state, userUpdate)
    return { ...state, detail: { ...state.detail, userUpdate } }
  },
  [setUserDetailPage]: (state, detail) => ({ ...state, detail }),
}
export default createReducer(ACTION_HANDLES, initialState)
