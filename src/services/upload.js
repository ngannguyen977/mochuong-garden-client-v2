import constant from '../config/default'
import axios from 'axios'

const api = constant.api.upload
const instance = axios.create({
    baseURL: api.host,
    timeout: 30000,
    headers: { Authorization: 'Bearer ' + constant.api.resource.token },
})
export const getList = (limit, page, sort, isAsc) =>
    new Promise((resolve, reject) => {
        instance
            .get(api, {
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
            .get(`${api}/${id}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
export const create = file =>
    new Promise((resolve, reject) => {
        instance
            .post(api, file)
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
            .patch(`${api}/${id}`, { request: { name } })
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
            .delete(`${api}?ids=${ids}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })