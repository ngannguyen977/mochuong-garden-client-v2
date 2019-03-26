import { createAction, createReducer } from "redux-act"
import { message } from "antd"
import axios from "axios"
import constant from "../config/default"
import { notification } from "antd"
import {
  getPoliciesByResource,
  createPolicy,
  getPolicyByName,
  createUserPolicy,
  deleteUserPolicy,
  deletePolicy,
} from "../services/policy"
import { setUserPage } from "./user"
import { prepareThingPermission } from "./factory"
import helper from "../helper"

export const REDUCER = "thing"

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const thingApi = `${api.host}/${api.thing}`
const thingPropertyApi = `${api.host}/${api.thingProperty}`
const thingAlertApi = `${api.host}/${api.alertThing}`

export const setThingPage = createAction(`${NS}SET_THING_PAGE`)
export const setThingChildrenPage = createAction(`${NS}SET_THING_CHILDREN_PAGE`)
export const setThingDetailPage = createAction(`${NS}SET_THING_DETAIL_PAGE`)
export const createThingState = createAction(`${NS}CREATE_THING`)
export const updateThingState = createAction(`${NS}UPDATE_THING`)
export const getThingsInGroup = createAction(`${NS}GET_THINGS_GROUP`)
export const getPermission = createAction(`${NS}GET_THING_PERMISSION`)
export const currentTab = createAction(`${NS}SET_CURRENT_TAB`)
export const setCertificate = createAction(`${NS}SET_THING_CERTIFICATES`)

export const getList = (limit = 18, page = 0, sort = "name", isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(thingApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { things, page, totalItems } = response.data
      dispatch(setThingPage({ things, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get thing list fail"
      message.error(errorMessage)
    })
}
export const getListByGraphQL = (
  keyword = "",
  limit = 18,
  page = 0,
  sort = "name",
  isAsc = false,
  types = "",
  templateName = "",
  templateType = "",
) => (dispatch, getState) => {
  let query = `{pages(key:"${keyword}",templateName:"${templateName}"){page,totalItems, things{name,description,displayName,imageUrl,isActive,serial}}}`
  axios
    .get(`${thingApi}/graphql/search?query=${query}`, {
      params: { limit: limit, page: page, sort: sort, isAsc: isAsc },
    })
    .then(response => {
      let { things, page, totalItems } = response.data.data.pages
      dispatch(setThingPage({ things, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get thing list fail"
      message.error(errorMessage)
    })
}
export const getAllUsers = (
  thingName,
  limit = 18,
  page = 0,
  sort = "name",
  isAsc = false,
) => async (dispatch, getState) => {
  const userApi = constant.api.authen

  let resourceType = "things"
  let effect = "Allow"
  // "orn:[partition]:[service]:[region]:[account-id]:resource_type/name"
  let resourceOrn = `orn::iot::${constant.customer.number}:things/${thingName}`
  let policyPromise = getPoliciesByResource(resourceOrn, resourceType, effect)
  let userPromise = axios.get(`${userApi.host}/${userApi.user}`, {
    params: { limit, page, sort, isAsc },
  })
  Promise.all([policyPromise, userPromise])
    .then(response => {
      let { users, page, totalItems } = response[1].data || {}
      let policies = response[0] || []
      policies.forEach(policy => {
        let userHavePolicy = policy.users || []
        userHavePolicy.forEach(t => {
          let user = users.find(x => x.uuid === t)
          if (user && policy.resourceTypes) {
            if (
              policy.resourceTypes.actions.includes("iot:listThing") &&
              policy.resourceTypes.actions.includes("iot:readThing")
            ) {
              user.isView = true
            }
            if (policy.resourceTypes.actions.includes("iot:controlThing")) {
              user.isControl = true
            }
          }
        })
      })
      dispatch(setUserPage({ users, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get user list fail"
      message.error(errorMessage)
    })
}
export const getUsers = (thingName, limit = 18, page = 0, sort = "name", isAsc = false) => async (
  dispatch,
  getState,
) => {
  const userApi = constant.api.authen

  let resourceType = "things"
  let effect = "Allow"
  // "orn:[partition]:[service]:[region]:[account-id]:resource_type/name"
  let resourceOrn = `orn::iot::${constant.customer.number}:things/${thingName}`
  try {
    let policies = await getPoliciesByResource(resourceOrn, resourceType, effect)
    if (policies.length === 0) {
      dispatch(setUserPage({ users: [], page: 0, totalItems: 0 }))
      return
    }
    let userUuids = []
    policies.forEach(policy => {
      if (policy.users) {
        policy.users.forEach(x => {
          let uuid = userUuids.find(a => a === x)
          if (!uuid) {
            userUuids.push(x)
          }
        })
      }
    })
    let query = `{pages(uuids:"${userUuids.join(
      ",",
    )}"){page,totalItems, users{id,username,uuid,imageUrl}}}`
    let response = await axios.get(`${userApi.host}/${userApi.user}/graphql/search?query=${query}`)
    let { users, page, totalItems } = response.data.data.pages
    if (users && users.length > 0) {
      policies.forEach(policy => {
        let userHavePolicy = policy.users || []
        userHavePolicy.forEach(t => {
          let user = users.find(x => x.uuid === t)
          if (user && policy.resourceTypes) {
            if (
              policy.resourceTypes.actions.includes("iot:listThing") &&
              policy.resourceTypes.actions.includes("iot:readThing")
            ) {
              user.isView = true
            }
            if (policy.resourceTypes.actions.includes("iot:controlThing")) {
              user.isControl = true
            }
          }
        })
      })
      dispatch(setUserPage({ users, page, totalItems }))
    }
  } catch (error) {
    message.error(error.message)
    console.log(error)
  }
}
export const getOne = name => (dispatch, getState) => {
  axios
    .get(`${thingApi}/${name}`)
    .then(response => {
      console.log("get one done")
      dispatch(setThingDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get thing fail"
      message.error(errorMessage)
    })
}

export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createThingState(model))
  if (isCreate) {
    let thingModel = {
      name: model.name,
      description: model.description,
      templateID: (model.template || {}).id,
      projectID: (model.project || {}).id,
      imageId: (model.image || {}).uuid,
    }
    axios
      .post(thingApi, thingModel)
      .then(response => {
        //create thing thing property
        if (model.properties && model.properties.length > 0) {
          let thingId = response.data.id
          let propertyPromises = model.properties.map(property => {
            let propertyModel = {
              dataType: property.dataType,
              value: (property.defaultValue || "").toString(),
              description: property.description,
              isLogged: property.isLogged,
              isPersistent: property.isPersistent,
              isReadOnly: property.isReadOnly,
              name: property.name,
              thingID: thingId,
            }
            return axios.post(thingPropertyApi, propertyModel)
          })
          Promise.all(propertyPromises).then(res => {
            let alertPromises = res.map(x => {
              let property = model.properties.find(a => a.name === (x.data || {}).name)

              return ((property || {}).alerts || []).map(a => {
                let alertModel = {
                  defaultValue: a.value,
                  description: a.description,
                  name: a.name,
                  priorityId: a.priority,
                  parentId: x.data.id,
                }
                return axios.post(thingAlertApi, alertModel)
              })
            })
            Promise.all(alertPromises).then(x => {
              message.success("Create thing success!")
            })
          })
        }
        let { things, page, totalItems } = getState().thing
        things.push(response.data)
        dispatch(setThingPage({ things, page, totalItems: totalItems++ }))
        dispatch(createThingState({}))
      })
      .catch(error => {
        dispatch(createThingState({}))
        let errorMessage = ((error.response || {}).data || {}).message || "create thing fail"
        message.error(errorMessage)
      })
  }
}
export const update = (id, model, isUpdate) => (dispatch, getState) => {
  dispatch(setThingDetailPage(model))
  if (isUpdate) {
    axios
      .patch(`${thingApi}/${id}`, {
        description: model.description,
        name: model.name,
        imageId: model.imageId,
      })
      .then(response => {
        let { things, page, totalItems } = getState().thing
        if (things && Array.isArray(things) && things.length > 0) {
          let thingId = things.findIndex(x => x.id === response.data.id)
          if (thingId) {
            things[(id = thingId)] = response.data
            dispatch(setThingPage({ things, page, totalItems }))
            notification["success"]({
              message: "Update thing information success!",
              description:
                "Things status are updated. When things was left their job, you will remove them by delete things button or just deactive these things.",
            })
          }
        }
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || "change status thing fail"
        message.error(errorMessage)
      })
  }
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${thingApi}?ids=${ids}`)
    .then(response => {
      notification["success"]({
        message: "Delete thing success!",
        description:
          "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
      })
      let { things, page, totalItems } = getState().thing
      dispatch(
        setThingPage({
          things: things.filter(x => x.id != ids),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "delete thing fail"
      message.error(errorMessage)
    })
}
export const attachThing = (parentId, ids) => (dispatch, getState) => {
  axios
    .post(`${thingApi}/${parentId}/addthings?ids=${ids}`)
    .then(response => {
      notification["success"]({
        message: "Attach thing success!",
        description:
          "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "attach thing fail"
      message.error(errorMessage)
    })
}
export const removeThing = (parentId, id) => (dispatch, getState) => {
  axios
    .delete(`${thingApi}/${parentId}/removethings?ids=${id}`)
    .then(response => {
      let { things, page, totalItems } = getState().thing
      dispatch(
        setThingPage({
          things: things.filter(x => x.id != id),
          page,
          totalItems: totalItems--,
        }),
      )
      notification["success"]({
        message: "Remove thing success!",
        description:
          "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "remove thing fail"
      message.error(errorMessage)
    })
}
export const setCurrentTab = (id = 0, tab = "1") => (dispatch, getState) => {
  dispatch(currentTab({ id, tab }))
}
export const removeCertificate = id => (dispatch, getState) => {
  let { detail } = getState().thing
  let certificates = (detail || {}).certificates || []
  dispatch(setCertificate(certificates.filter(x => x.id !== id)))
}
export const registerGateway = serialNumber => (dispatch, getState) => {
  axios
    .post(`${thingApi}/register/${serialNumber}`)
    .then(response => {
      notification["success"]({
        message: "Register thing success!",
        description:
          "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "register thing fail"
      message.error(errorMessage)
    })
}
export const createThingPolicy = (userUuid, thingName, type) => async (dispatch, getState) => {
  let name = `iot-client-${userUuid}-${thingName}-${type}`
  try {
    let { users, page, totalItems } = getState().user
    let policy = await getPolicyByName(name)
    if (!policy) {
      // create new policy
      let document = prepareThingPermission(userUuid, thingName, type)
      policy = await createPolicy(userUuid, document)
      // await createUserPolicy(userUuid, { policyIds: policy.policyId })
    } else {
      // create user policy only
      await createUserPolicy(userUuid, { policyIds: policy.policyId })
    }
    let user = (users || []).find(x => x.uuid === userUuid)
    if (user) {
      switch (type) {
        case "control":
          user.isControl = true
          break
        case "view":
          user.isView = true
          break
        default:
          break
      }
    }
    dispatch(setUserPage({ users, page, totalItems }))
    notification["success"]({
      message: `Add permission ${type} for this user to thing: ${thingName} success!`,
      description:
        "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
    })
  } catch (error) {
    console.log("err", error)
  }
}
export const removeThingPolicy = (userUuid, thingName, type) => (dispatch, getState) => {
  let name = `iot-client-${userUuid}-${thingName}-${type}`
  let { users, page, totalItems } = getState().user

  getPolicyByName(name)
    .then(policy => {
      if (!policy) {
        message.warn("policy does not exist!")
      } else {
        deleteUserPolicy(userUuid, policy.policyId)
        let user = users.find(x => x.uuid === userUuid)
        if (user) {
          switch (type) {
            case "control":
              user.isControl = false
              break
            case "view":
              user.isView = false
              break
            default:
              break
          }
        }
        dispatch(setUserPage({ users, page, totalItems }))
        notification["success"]({
          message: `Remove permission ${type} for this user to thing: ${thingName} success!`,
          description:
            "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
        })
      }
    })
    .catch(err => {
      console.log("err", err)
    })
}
export const deleteThingPolicy = (userUuid, thingName) => (dispatch, getState) => {
  let name = `iot-client-${userUuid}-${thingName}`
  let { users, page, totalItems } = getState().user

  let getControlThingPromise = getPolicyByName(`${name}-control`)
  let getViewThingPromise = getPolicyByName(`${name}-view`)
  Promise.all([getControlThingPromise, getViewThingPromise])
    .then(response => {
      let policyIds = response.map(x => x.policyId)
      deleteUserPolicy(userUuid, policyIds.join(","))
        .then(a =>
          deletePolicy(policyIds)
            .then(x => {
              //done
              users = (users || []).filter(x => x.uuid !== userUuid)
              totalItems -= 1
              dispatch(setUserPage({ users, page, totalItems }))
              notification["success"]({
                message: `Delete permission for this user to thing: ${thingName} success!`,
                description:
                  "These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.",
              })
            })
            .catch(err => {
              console.log(err)
            }),
        )
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}
const initialState = {
  things: [],
  page: 0,
  totalItems: 0,
}
const ACTION_HANDLES = {
  [setThingPage]: (state, { things, page, totalItems }) => ({
    ...state,
    things,
    page,
    totalItems,
  }),
  [createThingState]: (state, thingCreate) => ({ ...state, thingCreate }),
  [setThingChildrenPage]: (state, children) => ({ ...state, children }),
  [updateThingState]: (state, thingUpdate) => {
    return { ...state, detail: { ...state.detail, thingUpdate } }
  },
  [setThingDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getThingsInGroup]: (state, thingsInGroup) => ({ ...state, thingsInGroup }),
  [currentTab]: (state, { id, tab }) => {
    if (!state.tabs) {
      state.tabs = []
    }
    let _tab = state.tabs.find(x => x.id === id)
    if (_tab) {
      _tab.tab = tab
    } else {
      state.tabs.push({ id, tab })
    }
    return state
  },
  [setCertificate]: (state, certificates) => ({
    ...state,
    detail: { ...state.detail, certificates },
  }),
}
export default createReducer(ACTION_HANDLES, initialState)
