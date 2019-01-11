import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'

export const REDUCER = 'alert'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const alertApi = `${api.host}/${api.alertTemplate}`
const alertThingApi = `${api.host}/${api.thingAlert}`

export const setAlertPage = createAction(`${NS}SET_ALERT_PAGE`)
export const setAlertDetailPage = createAction(`${NS}SET_ALERT_DETAIL_PAGE`)
export const createAlertState = createAction(`${NS}CREATE_ALERT`)
export const updateAlertState = createAction(`${NS}UPDATE_ALERT`)
export const getAlertsInGroup = createAction(`${NS}GET_ALERTS_GROUP`)
export const getPermission = createAction(`${NS}GET_ALERT_PERMISSION`)

export const getList = (
  type,
  parentid,
  templateid,
  limit = 10,
  page = 0,
  sort = 'name',
  isAsc = false,
) => (dispatch, getState) => {
  axios
    .get(alertApi, {
      params: { parentid, templateid, limit: limit, page: page, sort: sort, isAsc: isAsc },
    })
    .then(response => {
      let { alertTemplates, page, totalItems } = response.data
      dispatch(setAlertPage({ alerts: alertTemplates, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get alert list fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${alertApi}/${id}`)
    .then(response => {
      dispatch(setAlertDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get alert fail'
      message.error(errorMessage)
    })
}
export const create = (name, defaultValue, priorityID, propertyTemplateID) => (
  dispatch,
  getState,
) => {
  axios
    .post(alertApi, { name, defaultValue, priorityID, propertyTemplateID })
    .then(response => {
      notification['success']({
        message: 'Create alert success!',
        description: 'The alert was created successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create alert fail'
      message.error(errorMessage)
    })
}
export const createAlerts = (propertyId, alerts) => (dispatch, getState) => {
  if (!alerts || alerts.length === 0) {
    message.warn('No alert was created!')
    return
  }
  const { priorities } = getState().app.priority || {}
  let _promise = alerts.map(x => {
    if (!x.id) {
      let priorityID = (priorities || []).find(a => a.name === x.priority).id
      return axios.post(alertApi, {
        name: x.name,
        defaultValue: x.value,
        priorityID,
        propertyTemplateID: +propertyId,
      })
    }
    return null
  })
  Promise.all(_promise)
    .then(response => {
      notification['success']({
        message: 'Create alert success!',
        description: 'The alert was created successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create alert fail'
      message.error(errorMessage)
    })
}

export const update = (id, name, description) => (dispatch, getState) => {
  axios
    .patch(`${alertApi}/${id}`, { name, description })
    .then(response => {
      notification['success']({
        message: 'Update alert success!',
        description: 'The alert was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create alert fail'
      message.error(errorMessage)
    })
}
export const remove = id => (dispatch, getState) => {
  axios
    .delete(`${alertApi}?ids=${id}`)
    .then(response => {
      let { alerts, page, totalItems } = getState().alert
      alerts = alerts.filter(x => x.id !== id)
      totalItems -= 1
      dispatch(setAlertPage({ alerts, page, totalItems }))
      notification['success']({
        message: 'Delete alert success!',
        description: 'The alert was permanly deleted.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete alert fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${alertApi}?ids=${ids}`)
    .then(response => {
      let { alerts, page, totalItems } = getState().alert
      alerts = alerts.filter(x => !ids.includes(x.id))
      totalItems -= ids.length
      dispatch(setAlertPage({ alerts, page, totalItems }))
      notification['success']({
        message: 'Delete alert success!',
        description: 'The alert was permanly deleted.',
      })
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || 'delete alert fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  alerts: [],
}
const ACTION_HANDLES = {
  [setAlertPage]: (state, { alerts, page, totalItems }) => ({
    ...state,
    alerts,
    page,
    totalItems,
  }),
  [createAlertState]: (state, alertCreate) => ({ ...state, alertCreate }),
  [updateAlertState]: (state, alertUpdate) => {
    return { ...state, detail: { ...state.detail, alertUpdate } }
  },
  [setAlertDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getAlertsInGroup]: (state, alertsInGroup) => ({ ...state, alertsInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
