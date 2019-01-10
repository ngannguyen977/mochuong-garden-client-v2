import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'

export const REDUCER = 'property'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const propertyApi = `${api.host}/${api.templateProperty}`
const propertyThingApi = `${api.host}/${api.thingProperty}`

export const setPropertyPage = createAction(`${NS}SET_PROPERTY_PAGE`)
export const setPropertyDetailPage = createAction(`${NS}SET_PROPERTY_DETAIL_PAGE`)
export const createPropertyState = createAction(`${NS}CREATE_PROPERTY`)
export const updatePropertyState = createAction(`${NS}UPDATE_PROPERTY`)
export const getPropertiesInGroup = createAction(`${NS}GET_PROPERTYS_GROUP`)
export const getPermission = createAction(`${NS}GET_PROPERTY_PERMISSION`)

export const getList = (type, parentid, limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(propertyApi, { params: { parentid, limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { propertyTemplates, page, totalItems } = response.data
      dispatch(setPropertyPage({ properties: propertyTemplates, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get property list fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${propertyApi}/${id}`)
    .then(response => {
      dispatch(setPropertyDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get property fail'
      message.error(errorMessage)
    })
}
export const create = (name, description, color, project) => (dispatch, getState) => {
  axios
    .post(propertyApi, { name, description, color, project })
    .then(response => {
      notification['success']({
        message: 'Create property success!',
        description: 'The property was created successfully!'
      })
      dispatch(push('/properties'))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create property fail'
      message.error(errorMessage)
    })
}
export const update = (id, name, description) => (dispatch, getState) => {
  axios
    .patch(`${propertyApi}/${id}`, { name, description })
    .then(response => {
      notification['success']({
        message: 'Update property success!',
        description: 'The property was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create property fail'
      message.error(errorMessage)
    })
}
export const updateProperty = (id, model, isUpdate) => (dispatch, getState) => {
  // TODO: create new
  // TODO: delete old
  // TODO: update if change
  getList('template',id,1000).then(res =>{
    let properties = res.data.propertyTemplates

  })
  let response = model.map(x => axios
    .patch(`${propertyApi}/${id}`, {
      dataType: model.type, defaultValue: model.value,
      name: model.name, description: model.description, isLogged: model.isLogged, isPersistent: model.isPersistent, isReadOnly: model.isReadOnly
    }))
  Promise.all(response)
    .then(response => {
      notification['success']({
        message: 'Update property success!',
        description: 'The property was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create property fail'
      message.error(errorMessage)
    })
}
export const remove = id => (dispatch, getState) => {
  axios
    .delete(`${propertyApi}?ids=${id}`)
    .then(response => {
      let { properties, page, totalItems } = getState().property
      properties = properties.filter(x => x.id !== id)
      totalItems -= 1
      dispatch(setPropertyPage({ properties, page, totalItems }))
      notification['success']({
        message: 'Delete property success!',
        description: 'The property was permanly deleted.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete property fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${propertyApi}?ids=${ids}`)
    .then(response => {
      let { properties, page, totalItems } = getState().property
      properties = properties.filter(x => !ids.includes(x.id))
      totalItems -= ids.length
      dispatch(setPropertyPage({ properties, page, totalItems }))
      notification['success']({
        message: 'Delete property success!',
        description: 'The property was permanly deleted.',
      })
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || 'delete property fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  properties: [],
}
const ACTION_HANDLES = {
  [setPropertyPage]: (state, { properties, page, totalItems }) => ({
    ...state,
    properties,
    page,
    totalItems,
  }),
  [createPropertyState]: (state, propertyCreate) => ({ ...state, propertyCreate }),
  [updatePropertyState]: (state, propertyUpdate) => {
    return { ...state, detail: { ...state.detail, propertyUpdate } }
  },
  [setPropertyDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getPropertiesInGroup]: (state, propertiesInGroup) => ({ ...state, propertiesInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
