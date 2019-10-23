import { createReducer } from 'redux-act'
import * as app from 'reducers/app'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { push } from 'react-router-redux'

export const REDUCER = 'recovery'

// Add forgot password api
const api = constant.api.authen
const recoveryApi = `${api.host}/${api.recovery}`

export const submit = ({ alias, username, newPassword, confirmPassword, token }) => (dispatch, getState) => {
    dispatch(app.addSubmitForm(REDUCER))
    axios
        .post(recoveryApi, { alias, username, newPassword, confirmPassword, token })
        .then(() => {
            notification.success({
                message: "Set new password successful!",
                description:
                    "You have successfully change your password!",
            })
            dispatch(push('/login'))
        })
        .catch((err) => {
            notification.error({
                message: "Request new password failed!",
                description: err.response.data.Message
            })
            // return resolve(false)
        })
}

const initialState = {}
export default createReducer({}, initialState)
