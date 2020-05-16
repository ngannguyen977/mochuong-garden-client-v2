import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { pendingTasksReducer } from "react-redux-spinner"
import app from "./app"
import productPageReducer from "./product"
import categoriesReducer from "./categories"
import ordersReducer from "./order"
import uploadReducer from "./upload"

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  productPageReducer:productPageReducer,
  categoriesReducer:categoriesReducer,
  ordersReducer: ordersReducer,
  uploadReducer
})
