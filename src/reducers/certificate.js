import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'
import { setThingDetailPage, removeCertificate } from 'reducers/thing'

export const REDUCER = 'certificate'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const certificateApi = `${api.host}/${api.certificate}`

export const setCertificatePage = createAction(`${NS}SET_CERTIFICATE_PAGE`)
export const setCertificateDetailPage = createAction(`${NS}SET_CERTIFICATE_DETAIL_PAGE`)
export const createCertificateState = createAction(`${NS}CREATE_CERTIFICATE`)
export const updateCertificateState = createAction(`${NS}UPDATE_CERTIFICATE`)
export const getCertificatesInGroup = createAction(`${NS}GET_CERTIFICATES_GROUP`)
export const getPermission = createAction(`${NS}GET_CERTIFICATE_PERMISSION`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(certificateApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { certificates, page, totalItems } = response.data
      dispatch(setCertificatePage({ certificates, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get certificate list fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${certificateApi}/${id}`)
    .then(response => {
      dispatch(setCertificateDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get certificate fail'
      message.error(errorMessage)
    })
}
export const create = thingId => (dispatch, getState) => {
  axios
    .post(certificateApi, { thingId: +thingId })
    .then(response => {
      notification['success']({
        message: 'Create certificate success!',
        description: 'The certificate was created successfully!',
      })
      let detail = getState().thing.detail || {}
      let certificates = detail.certificates || []
      certificates.push(response.data)
      dispatch(setThingDetailPage({ ...detail, certificates }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create certificate fail'
      message.error(errorMessage)
    })
}
export const update = (id, name, description) => (dispatch, getState) => {
  axios
    .patch(`${certificateApi}/${id}`, { name, description })
    .then(response => {
      notification['success']({
        message: 'Update certificate success!',
        description: 'The certificate was updated successfully!',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'create certificate fail'
      message.error(errorMessage)
    })
}
export const remove = id => (dispatch, getState) => {
  axios
    .delete(`${certificateApi}?ids=${id}`)
    .then(response => {
      dispatch(removeCertificate(id))
      notification['success']({
        message: 'Delete certificate success!',
        description: 'The certificate was permanly deleted.',
      })
    })
    .catch(error => {
      console.log('errror', error)
      let errorMessage = ((error.response || {}).data || {}).message || 'remove certificate fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${certificateApi}?ids=${ids}`)
    .then(response => {
      let { certificates, page, totalItems } = getState().certificate
      certificates = certificates.filter(x => !ids.includes(x.id))
      totalItems -= ids.length
      dispatch(setCertificatePage({ certificates, page, totalItems }))
      notification['success']({
        message: 'Delete certificate success!',
        description: 'The certificate was permanly deleted.',
      })
    })
    .catch(error => {
      console.log('errror', error)
      let errorMessage = ((error.response || {}).data || {}).message || 'delete certificate fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  certificates: [],
}
const ACTION_HANDLES = {
  [setCertificatePage]: (state, { certificates, page, totalItems }) => ({
    ...state,
    certificates,
    page,
    totalItems,
  }),
  [createCertificateState]: (state, certificateCreate) => ({ ...state, certificateCreate }),
  [updateCertificateState]: (state, certificateUpdate) => {
    return { ...state, detail: { ...state.detail, certificateUpdate } }
  },
  [setCertificateDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getCertificatesInGroup]: (state, certificatesInGroup) => ({ ...state, certificatesInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
