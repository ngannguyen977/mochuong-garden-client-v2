import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import constant from '../../config/default'

const REDUCER = 'group'
const NS = `@@${REDUCER}/`
const api = constant.api.authen

export const setGroupState = createAction(`${NS}SET_GROUP_STATE`)

export const getData = (limit, page, sort, isAsc) => (dispatch, getState) => {
    axios.get(`${api.host}/${api.group}`, { limit, page, sort, isAsc }).then(response => {
        if (response.data && response.data.groups) {
            dispatch(setGroupState({
                groups: response.data.groups,
                page: response.data.page || 0
            }))
        }
    })
}

const ACTION_HANDLES = {
    [setGroupState]: (state, groupState) => ({ ...state, groupState })
}
const initialState = {
    groupState: null
}

export default createReducer(ACTION_HANDLES, initialState)