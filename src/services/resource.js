import constant from '../config/default'
import axios from 'axios'

const api = constant.api.resource
const serviceApi = `${api.host}/${api.service}`
const instance = axios.create({
  baseURL: api.host,
  timeout: 30000,
  headers: { Authorization: 'Bearer ' + constant.api.resource.token },
})
export const getServices = (keyword, keysort, skip, count, orderDescending = true) =>
  new Promise((resolve, reject) => {
    console.log('insta', instance)
    instance
      .get(serviceApi, {
        params: { keyword, keysort, skip, count, orderDescending },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getActions = shortname =>
  new Promise((resolve, reject) => {
    instance
      .get(`${serviceApi}/${api.serviceGetByShortName}/${shortname}/${api.serviceGetActions}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
