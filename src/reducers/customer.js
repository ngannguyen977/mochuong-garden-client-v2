import {
  createAction,
  createReducer
} from "redux-act"
import {
  message
} from "antd"
import axios from "axios"
import constant from "../config/default"
import {
  notification
} from "antd"
import {
  setThingPage
} from 'reducers/thing'
// import { prepareThingPermission } from "./factory"
import helper from "../helper";

export const REDUCER = "customer"

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const clientApi = `${api.host}/${api.observer}`
const passwordApi = `${api.host}/${api.password}`
const thingApi = `${constant.api.iot.host}/${constant.api.iot.thing}`
const iotMicroApi = `${constant.api.micro.host}/${constant.api.micro.iot}`
const notificationApi = `${constant.api.micro.host}/${constant.api.micro.notification}`

export const setclientPage = createAction(`${NS}SET_CLIENT_PAGE`)
export const setclientDetailPage = createAction(`${NS}SET_CLIENT_DETAIL_PAGE`)
export const setclientLogPage = createAction(`${NS}SET_CLIENT_LOG_PAGE`)
export const setclientNotificationPage = createAction(`${NS}SET_CLIENT_NOTIFICATION_PAGE`)
export const createclientState = createAction(`${NS}CREATE_CLIENT`)
export const updateclientState = createAction(`${NS}UPDATE_CLIENT`)


export const getAllThing = (
  clientUuid,
  clientname,
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
  if (!clientUuid) {
    let response = await axios.get(`${clientApi}/${clientname}`)
    dispatch(setclientDetailPage(response.data))
    clientUuid = response.data.uuid
  }
  let query = `{pages(key:"${keyword}",templateName:""){page,totalItems, things{name,description,displayName,imageUrl,isActive,serial}}}`

  let thingsPromise = axios.get(`${thingApi}/graphql/search?query=${query}`, {
    params: {
      limit: limit,
      page: page,
      sort: sort,
      isAsc: isAsc
    },
  })
  // let policiesPromise = getPolicyByclient(clientUuid)

  Promise.all([thingsPromise])
    .then(response => {
      let {
        things,
        page,
        totalItems
      } = response[0].data.data.pages
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
      dispatch(setThingPage({
        things,
        page,
        totalItems
      }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get client list fail"
      message.error(errorMessage)
    })
}


export const getList = (limit = 10, page = 0, sort = "name", isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(`${clientApi}/clients`, {
      params: {
        limit: limit,
        page: page,
        isAsc: isAsc
      }
    })
    .then(response => {
      let {
        clients,
        page,
        totalItems
      } = response.data
      // get all things for these clients
      let customers = ((clients || []).map(x => x.accountNumber) || []).join(',')
      axios.get(`${thingApi}/summary-list`, {
        params: {
          customers: customers
        }
      }).then(thingResponse => {
        let {
          things
        } = thingResponse.data
        clients = clients.map(x => {
          x.things = things.filter(a => a.customerNumber === x.accountNumber)
          return x
        })
        localStorage.setItem('app.things', JSON.stringify(things))
      }).catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || "get thing of client list fail"
        message.error(errorMessage)
      })

      dispatch(setclientPage({
        clients,
        page,
        totalItems
      }))

    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get client list fail"
      message.error(errorMessage)
    })
}
export const getOne = customerNumber => (dispatch, getState) => {
  axios
    .get(`${clientApi}/${customerNumber}`)
    .then(response => {
      dispatch(setclientDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "get client fail"
      message.error(errorMessage)
    })
}
export const getLog = (customerNumber, propertyName, limit = 20) => (dispatch, getState) => {
  axios
    .get(`${iotMicroApi}/${constant.api.micro.getLog}?customer_number=${customerNumber}&limit=${limit}`)
    .then(response => {
        dispatch(setclientLogPage(response.data))
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || "get client fail"
      message.error(errorMessage)
    })
}
export const getNotification = (cn,serial,  limit = 20) => (dispatch, getState) => {
  let url = `GetNotificationAPI?cn=${cn}&count=${limit}`
  if(serial){
    url+=`&serial=${serial}`
  }
  axios
    .get(`${notificationApi}/${url}`)
    .then(response => {
        dispatch(setclientNotificationPage(response.data))
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || "get  Notification fail"
      message.error(errorMessage)
    })
}
export const changeStatus = (clientname, status) => (dispatch, getState) => {
  axios
    .patch(`${clientApi}/${clientname}`, {
      active: status
    })
    .then(response => {
      let {
        clients,
        page,
        totalItems
      } = getState().client
      if (clients && Array.isArray(clients) && clients.length > 0) {
        let cName = clients.findIndex(x => x.clientname === response.data.clientname)
        if (cName) {
          clients[(clientname = cName)] = response.data
          dispatch(setclientPage({
            clients,
            page,
            totalItems
          }))
          notification["success"]({
            message: "Change status of clients success!",
            description: "clients status are updated. When clients was left their job, you will remove them by delete clients button or just deactive these clients.",
          })
        }
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "change status client fail"
      message.error(errorMessage)
    })
}
export const changeGroups = (clientname, groupNames) => (dispatch, getState) => {
  axios
    .patch(`${clientApi}/${clientname}`, {
      groupNames
    })
    .then(response => {
      let {
        clients,
        page,
        totalItems
      } = getState().client
      if (clients && Array.isArray(clients) && clients.length > 0) {
        let cName = clients.findIndex(x => x.clientname === response.data.clientname)
        if (cName) {
          clients[(clientname = cName)] = response.data
          dispatch(setclientPage({
            clients,
            page,
            totalItems
          }))
          notification["success"]({
            message: "Change groups of this client success!",
            description: "clients groups are update. Please re-check permission for this client.",
          })
        }
      }
    })
    .catch(error => {
      let errorMessage =
        ((error.response || {}).data || {}).message || "change groups for client fail"
      message.error(errorMessage)
    })
}
export const destroy = clientnames => (dispatch, getState) => {
  axios
    .delete(`${clientApi}?clientnames=${clientnames}`)
    .then(response => {
      notification["success"]({
        message: "Delete client success!",
        description: "These clients will be delete permanly shortly in 1 month. In that time, if you re-create these client, we will revert information for them.",
      })
      let {
        clients,
        page,
        totalItems
      } = getState().client
      dispatch(
        setclientPage({
          clients: clients.filter(client => client.clientname !== clientnames),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "delete client fail"
      message.error(errorMessage)
    })
}
export const changePassword = (id, model) => (dispatch, getState) => {
  let _model = {
    newPassword: model.newPassword,
    newPasswordConfirm: model.confirm,
    oldPassword: model.oldPassword,
  }
  axios
    .patch(`${passwordApi}/${id}`, _model)
    .then(response => {
      notification["success"]({
        message: "Update client success!",
        description: "The password of this client is changed successfully!.Now, this client can login with new password!",
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || "update groups fail"
      message.error(errorMessage)
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createclientState(model))
  if (isCreate) {
    let _model = {
      password: model.password,
      passwordConfirm: model.password,
      clientname: model.clientname,
    }
    axios
      .post(`${clientApi}/client`, _model)
      .then(response => {
        let {
          clients,
          page,
          totalItems
        } = getState().client
        // let customerNumber = getState().app.clientState.customer.accountNumber
        clients.push(response.data)
        dispatch(setclientPage({
          clients,
          page,
          totalItems: totalItems++
        }))
        console.log(model)
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          //prepare document for create policies
          for (let thing of model.permissions) {
            if (thing.isControl) {
              // let document = prepareThingPermission(response.data.uuid, thing.name, "control", customerNumber)
            }
            if (thing.isView) {
              // let document = prepareThingPermission(response.data.uuid, thing.name, "view", customerNumber)
            }
          }
        }
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || "create client fail"
        message.error(errorMessage)
      })
  }
}

const initialState = {
  totalItems: -1,
  page: 0,
  clients: [],
}
const ACTION_HANDLES = {
  [setclientPage]: (state, {
    clients,
    page,
    totalItems
  }) => ({
    ...state,
    clients,
    page,
    totalItems
  }),
  [createclientState]: (state, clientCreate) => ({
    ...state,
    clientCreate
  }),
  [updateclientState]: (state, clientUpdate) => {
    console.log("handle action update client", state, clientUpdate)
    return {
      ...state,
      detail: {
        ...state.detail,
        clientUpdate
      }
    }
  },
  [setclientDetailPage]: (state, detail) => ({
    ...state,
    detail
  }),
  [setclientLogPage]: (state, log) => ({
    ...state,
    log
  }),
  [setclientNotificationPage]: (state, notification) => ({
    ...state,
    notification
  }),
}
export default createReducer(ACTION_HANDLES, initialState)