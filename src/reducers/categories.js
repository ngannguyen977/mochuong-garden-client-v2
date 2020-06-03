
import { createAction, createReducer } from "redux-act"
import database from '../firebaseConnect';

const ACTION_LIST = createAction(`CATEGORY_LIST`)

export const listCategory = () => {
    return(dispatch)=>{
        // GET data from FIREBASE
        // Dispatch in to Reducer
        database.getDataCategory().then(categories=>{
            console.log('categories reducerkkkkkkkkkkk', categories)
            dispatch(ACTION_LIST(categories))
        })
    }
}

const initialState={};
const ACTION_HANDLES = {
    [ACTION_LIST]: (state, categories)=>{
        return {...state, categories}
    }
}
let categoriesReducer = createReducer(ACTION_HANDLES, initialState)
export default categoriesReducer;