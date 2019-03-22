import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { pendingTasksReducer } from "react-redux-spinner"
import app from "./app"
import login from "./login"
import register from "./register"
import user from "./user"
import group from "./group"
import permission from "./permission"
import template from "./template"
import property from "./property"
import alert from "./alert"
import thing from "./thing"

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  register,
  user,
  group,
  permission,
  template,
  property,
  alert,
  thing,
})
