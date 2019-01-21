import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import axios from 'axios'
import constant from '../config/default'

const api = constant.api.authen
const configure = constant.api.configure
const REDUCER = 'app'
const NS = `@@${REDUCER}/`
const loginApi = `${api.host}/${api.login}`
const dataTypeApi = `${configure.host}/${configure.dataType}`
const alertTypeApi = `${configure.host}/${configure.alertType}`
const priorityApi = `${configure.host}/${configure.priority}`
const thingTypeApi = `${configure.host}/${configure.thingType}`
const infoApi = `${api.host}/${api.info}`

export const _setFrom = createAction(`${NS}SET_FROM`)
export const _setLoading = createAction(`${NS}SET_LOADING`)
export const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const setDataTypeState = createAction(`${NS}SET_DATATYPE_STATE`)
export const setAlertTypeState = createAction(`${NS}SET_ALERTTYPE_STATE`)
export const setPriorityState = createAction(`${NS}SET_PRIORITY_STATE`)
export const setThingTypeState = createAction(`${NS}SET_THING_TYPE_STATE`)

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const login = (customer, username, password, dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .post(loginApi, { customer, username, password })
      .then(response => {
        dispatch(
          setUserState({
            userState: {
              token: response.data.token,
              refresh_token: response.data.refresh_token,
              expires: response.data.expires,
            },
          }),
        )
        let _promise = [dataTypeApi, alertTypeApi, priorityApi, infoApi, thingTypeApi].map(x =>
          axios.get(x, { limit: 100 }),
        )
        Promise.all(_promise)
          .then(res => {
            let dataTypes = res[0].data
            let alertTypes = res[1].data
            let priorites = res[2].data
            let userInfo = res[3].data
            let thingTypes = res[4].data
            dispatch(setDataTypeState(dataTypes))
            dispatch(setAlertTypeState(alertTypes))
            dispatch(setPriorityState(priorites))
            dispatch(setThingTypeState(thingTypes))
            dispatch(_setHideLogin(true))
            dispatch(
              setUserState({
                userState: {
                  ...userInfo.data,
                  token: response.data.token,
                  refresh_token: response.data.refresh_token,
                  expires: response.data.expires,
                },
              }),
            )
            notification.open({
              type: 'success',
              message: 'You have successfully logged in!',
              description:
                'Welcome to the OnSky Family. The OnSky Team is a complimentary template that empowers developers to make perfect looking and useful apps!',
            })
            dispatch(push('/'))
            return resolve(true)
          })
          .catch(error => {
            console.log('GET INFO ERROR', error.message)
            return resolve(false)
          })
      })
      .catch(error => {
        console.log('ERROR', error.message)
        dispatch(_setFrom(''))
        return resolve(false)
      })
  })
export const commonData = () => (dispatch, getState) => {}
export const logout = () => (dispatch, getState) => {
  dispatch(
    setUserState({
      userState: {
        customer: '',
        user: '',
        token: '',
        role: '',
      },
    }),
  )
  dispatch(push('/login'))
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: false,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: true,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    customer: '',
    user: '',
    token: '',
    role: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => {
      window.localStorage.setItem('app.token', JSON.stringify(userState.token))
      window.localStorage.setItem('app.userState', JSON.stringify(userState))
      return { ...state, userState }
    },
    [setThingTypeState]: (state, thingTypes) => {
      window.localStorage.setItem('app.thingTypes', JSON.stringify(thingTypes))
      return { ...state, thingTypes }
    },
    [setDataTypeState]: (state, dataTypes) => {
      window.localStorage.setItem('app.dataTypes', JSON.stringify(dataTypes))
      return { ...state, dataTypes }
    },
    [setAlertTypeState]: (state, alertTypes) => {
      window.localStorage.setItem('app.alertTypes', JSON.stringify(alertTypes))
      return { ...state, alertTypes }
    },
    [setPriorityState]: (state, priority) => {
      window.localStorage.setItem('app.priority', JSON.stringify(priority))
      return { ...state, priority }
    },
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
