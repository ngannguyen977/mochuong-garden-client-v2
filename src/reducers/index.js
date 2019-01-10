import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import app from './app'
import login from './login'
import register from './register'
import user from './user'
import group from './group'
import permission from './permission'
import project from './project'
import policy from './policy'
import template from './template'
import priority from './priority'
import property from './property'

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  register,
  user,
  group,
  permission,
  project,
  policy,
  template,
  priority,
  property
})
