import constant from '../config/default'
import axios from 'axios'

const api = constant.api.upload
let token = window.localStorage.getItem('app.token') || ''
const instance = axios.create({
  baseURL: api.host,
  timeout: 30000,
  headers: {
    accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token.toString().replace(/['"]+/g, ''),
  },
})
export const getList = (limit, page, sort, isAsc) =>
  new Promise((resolve, reject) => {
    instance
      .get('', {
        params: { limit, page, sort, isAsc },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const getOne = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const create = file =>
  new Promise((resolve, reject) => {
    console.log('fieeeeeeeee', file)
    instance
      .post('', { file })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const update = (id, name) =>
  new Promise((resolve, reject) => {
    instance
      .patch(`/${id}`, { request: { name } })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
export const remove = ids =>
  new Promise((resolve, reject) => {
    instance
      .delete(`?ids=${ids}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
