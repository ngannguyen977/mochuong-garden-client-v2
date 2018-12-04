import { createReducer } from 'redux-act'
import * as app from 'reducers/app'
import { message } from 'antd'

export const REDUCER = 'login'

export const submit = ({ alias, userName, password }) => (dispatch, getState) => {
  dispatch(app.addSubmitForm(REDUCER))
  app.login(alias, userName, password, dispatch).then(isLoggined => {
    if (isLoggined) {
      dispatch(app.deleteSubmitForm(REDUCER))
    } else {
      dispatch(app.deleteSubmitForm(REDUCER))
      message.error('Invalid username or password')
    }
  })
}

const initialState = {}
export default createReducer({}, initialState)
