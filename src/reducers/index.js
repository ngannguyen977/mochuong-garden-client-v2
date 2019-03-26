import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { pendingTasksReducer } from "react-redux-spinner"
import app from "./app"
import login from "./login"
import register from "./register"
import user from "./user"
import property from "./property"
import thing from "./thing"

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  register,
  user,
  property,
  thing,
})
