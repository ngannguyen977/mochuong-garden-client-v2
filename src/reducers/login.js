import { createReducer } from 'redux-act'
import * as app from 'reducers/app'
import { message } from 'antd'
import { push } from "react-router-redux"
import queryString from 'query-string'

export const REDUCER = 'login'

export const submit = ({ customer, userName, password },locations) => (dispatch, getState) => {
  dispatch(app.addSubmitForm(REDUCER))
  app.login(customer, userName, password, dispatch).then(isLoggined => {
    if (!isLoggined) {
      dispatch(app.deleteSubmitForm(REDUCER))
      message.error('Invalid username or password')
      return
    }
    if(!locations){
      dispatch(app.deleteSubmitForm(REDUCER))
      return
    }
    const params = queryString.parse(locations)
    dispatch(push(`${params.refererLink}${locations}`))
  })
}

const initialState = {}
export default createReducer({}, initialState)
