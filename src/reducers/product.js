import { createAction, createReducer } from "redux-act"

export const REDUCER = "product"

const ACTION_LIST = createAction(`${REDUCER}_LIST`)
const ACTION_DETAIL = createAction(`${REDUCER}_DETAIL`)
const ACTION_ADD = createAction(`${REDUCER}_ADD`)
const ACTION_EDIT = createAction(`${REDUCER}_EDIT`)
const ACTION_DELETE = createAction(`${REDUCER}_DELETE`)

export const list = (keyword = '', limit = 100, page = 0) => (
  dispatch,
  getState,
) => {
  // call api get list page here
  // example: dataNote.get()
  let data = [{name:"example demo"}]
  // dispatch action here
  dispatch(ACTION_LIST(data))
}

const initialState = []
const ACTION_HANDLES = {
  [ACTION_LIST]: (state, data) => ({ ...state, data }),
}
export default createReducer(ACTION_HANDLES, initialState)
