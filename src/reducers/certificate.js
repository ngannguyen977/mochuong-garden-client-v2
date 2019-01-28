import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'
import { setThingDetailPage, removeCertificate, setThingPage } from 'reducers/thing'
import { setPolicyPage } from 'reducers/policy'
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
export const currentTab = createAction(`${NS}SET_CERTIFICATE_CURRENT_TAB`)

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
export const setCurrentTab = (id = 0, tab = '1') => (dispatch, getState) => {
  dispatch(currentTab({ id, tab }))
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
export const attachThing = (parentId, ids) => (dispatch, getState) => {
  axios
    .post(`${certificateApi}/${parentId}/addthings?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Attach thing success!',
        description:
          'These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'attach thing fail'
      message.error(errorMessage)
    })
}
export const removeThing = (parentId, id) => (dispatch, getState) => {
  axios
    .delete(`${certificateApi}/${parentId}/removethings?ids=${id}`)
    .then(response => {
      let { things, page, totalItems } = getState().thing
      dispatch(
        setThingPage({
          things: things.filter(x => x.id != id),
          page,
          totalItems: totalItems--,
        }),
      )
      notification['success']({
        message: 'Remove thing success!',
        description:
          'These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'remove thing fail'
      message.error(errorMessage)
    })
}
export const attachPolicy = (parentId, ids) => (dispatch, getState) => {
  axios
    .post(`${certificateApi}/${parentId}/addpolicies?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Attach policy success!',
        description:
          'These policys will be delete permanly shortly in 1 month. In that time, if you re-create these policy, we will revert information for them.',
      })
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'attach policy fail'
      message.error(errorMessage)
    })
}
export const removePolicy = (parentId, id) => (dispatch, getState) => {
  axios
    .delete(`${certificateApi}/${parentId}/removepolicies?ids=${id}`)
    .then(response => {
      let { detail } = getState().certificate || {}(detail.policies || []).filter(x => x.id != id)
      dispatch(setCertificateDetailPage(detail, id))
      notification['success']({
        message: 'Remove policy success!',
        description:
          'These policys will be delete permanly shortly in 1 month. In that time, if you re-create these policy, we will revert information for them.',
      })
    })
    .catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || 'remove policy fail'
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
}
export default createReducer(ACTION_HANDLES, initialState)
