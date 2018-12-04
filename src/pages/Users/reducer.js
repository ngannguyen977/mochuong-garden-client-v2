import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import constant from '../../config/default'

const REDUCER = 'user'
const NS = `@@${REDUCER}/`
const api = constant.api.authen

export const setUserState = createAction(`${NS}SET_USER_STATE`)

export const getData = (limit, page, sort, isAsc) => (dispatch, getState) => {
  axios.get(`${api.host}/${api.user}`, { limit, page, sort, isAsc }).then(response => {
    if (response.data && response.data.users) {
      dispatch(
        setUserState({
          users: response.data.users,
          page: response.data.page || 0,
        }),
      )
    }
  })
}

const ACTION_HANDLES = {
  [setUserState]: (state, userState) => ({ ...state, userState }),
}
const initialState = {
  userState: null,
}

export default createReducer(ACTION_HANDLES, initialState)
