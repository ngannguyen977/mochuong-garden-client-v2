import constant from '../config/default'
import axios from 'axios'

const api = constant.api.policy
const policyApi = `${api.host}/${api.policy}`
const userApi = `${api.host}/${api.user}`
const groupApi = `${api.host}/${api.group}`
const token = JSON.parse(window.localStorage.getItem('app.token'))
console.log('token from local storage', token)
const instance = axios.create({
  baseURL: api.host,
  timeout: 30000,
  headers: {
    Authorization: 'Bearer ' + constant.api.policy.token,
    token: 'Bearer ' + token,
  },
})
export const getPolicies = (keyword, keysort, types, skip, limit, isAsc) =>
  new Promise((resolve, reject) => {
    instance
      .get(policyApi, {
        params: { keyword, keysort, types, skip, limit, isAsc },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getPolicyById = policyId =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/policy/${policyId}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getPolicyByUser = userUuid =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/users/${userUuid}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getPolicyByGroups = groupUuids =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/groups`, { params: { groupIds: groupUuids } })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getPolicyByGroup = groupUuids =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/groups`, { params: { groupIds: groupUuids } })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createPolicy = (userUuid, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${policyApi}/${userUuid}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createUserPolicy = (userUuid, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${userApi}/${userUuid}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createGroupPolicy = (groupUuid, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${groupApi}/${groupUuid}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const updateUserPolicies = (userUuid, policyIds) =>
  new Promise((resolve, reject) => {
    instance
      .put(`${userApi}/${userUuid}/permission?policyIds=${policyIds}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const updateGroupPolicies = (groupUuid, policyIds) =>
  new Promise((resolve, reject) => {
    instance
      .put(`${groupApi}/${groupUuid}/permission?policyIds=${policyIds}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const updatePolicy = (policyId, document) =>
  new Promise((resolve, reject) => {
    instance
      .put(`${policyApi}/${policyId}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const deletePolicy = policyIds =>
  new Promise((resolve, reject) => {
    instance
      .delete(`${policyApi}?policyIds=${policyIds}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
