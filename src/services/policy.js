import constant from '../config/default'
import axios from 'axios'

const api = constant.api.policy
const policyApi = `${api.host}/${api.policy}`
const userApi = `${api.host}/${api.user}`
const groupApi = `${api.host}/${api.group}`
const instance = axios.create({
  baseURL: api.host,
  timeout: 30000,
  headers: { Authorization: 'Bearer ' + constant.api.policy.token },
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
export const getPolicyByUserOrGroup = (userId, groupIds) =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/users/${userId}`, { params: { groupIds } })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getPolicyByGroup = groupIds =>
  new Promise((resolve, reject) => {
    instance
      .get(`${policyApi}/groups`, { params: { groupIds } })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createPolicy = (userId, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${policyApi}/${userId}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createUserPolicy = (userId, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${userApi}/${userId}`, document)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const createGroupPolicy = (groupId, document) =>
  new Promise((resolve, reject) => {
    instance
      .post(`${groupApi}/${groupId}`, document)
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
