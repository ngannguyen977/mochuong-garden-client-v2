import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { pendingTasksReducer } from "react-redux-spinner"
import app from "./app"
import productPageReducer from "./product"
import categoriesReducer from "./categories"
import uploadReducer from "./upload"
import cartReducer from "./cart"


export default combineReducers({
  // store
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  productPageReducer:productPageReducer,
  categoriesReducer:categoriesReducer,
  uploadReducer,
  cartReducer
})
