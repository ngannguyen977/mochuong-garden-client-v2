import { createAction, createReducer } from "redux-act"
import database from '../firebaseConnect';

const ACTION_LIST = createAction(`ORDER_LIST`)
export const orderList = (pageIndex =0)=>{
    return(dispatch)=>{
        database.getOrderFull(pageIndex).then(orders=>{
            // console.log("get order firebase",orders )
            dispatch(ACTION_LIST(orders))
        })
    }
}
const initalState ={};
const ACTION_HANDLES = {
    [ACTION_LIST]:(state,orders)=>{
        return{...state, orders}
    }
}
let ordersReducer = createReducer(ACTION_HANDLES, initalState)
export default ordersReducer