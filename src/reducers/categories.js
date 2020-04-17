import { v4 as uuidv4 } from 'uuid';
import { push } from 'react-router-redux'
import { createAction, createReducer } from "redux-act"
import database from '../firebaseConnect';

const ACTION_LIST = createAction(`CATEGORY_LIST`)
const ACTION_ADD = createAction(`CATEGORY_ADD`)
const ACTION_DELETE = createAction(`CATEGORIES_DELETE`)
const ACTION_EDIT = createAction(`CATEGORIES_EDIT`)
const ACTION_DETAIL = createAction(`ACTION_DETAIL`)
export const list = (pageIndex=0) => {
    return(dispatch)=>{
        //call api categories
        database.getDataCategory(pageIndex).then(categories=>{
            console.log('categories', categories)
            dispatch(ACTION_LIST(categories))
        })
    }
}
export const add = (category)=>{
    return(dispatch,getState)=>{
        category.id=uuidv4();
        category.createdAt = new Date().toString();
        let result = database.addDataCategory(category)
        dispatch(ACTION_ADD(result))
        // sau khi tao xong, back ve trang list
		dispatch(push('/categories'))
    }
}
export const deleteCate=(id)=>{
    return(dispatch)=>{
        let result = database.deleteCategory(id)
        dispatch(ACTION_DELETE(result))
        dispatch(list())
    }
}
export const getCateById=(id)=>{
    return(dispatch)=>{
        database.getOne(id).then(category=>{
            dispatch(ACTION_DETAIL(category))
        })
    }
}
export const updateCate=(id, category)=>{
    return (dispatch)=>{
        let result = database.updateCategory(id, category)
        dispatch(ACTION_EDIT(result))
        dispatch(push('/catogories'))
    }
}
const initialState={};
const ACTION_HANDLES = {
    [ACTION_LIST]: (state, categories)=>{
        console.log('categories reducer', categories)
        return {...state, categories}
    },
    [ACTION_ADD]:(state, category)=>{
        return {...state, category}
    },
    [ACTION_DELETE]:(state, category)=>{
        return{...state, category}
    },
    [ACTION_DETAIL]:(state, category)=>{
        return{...state, category}
    },
    [ACTION_EDIT]:(state, category)=>{
        return{...state, category}
    }
}
let categoriesReducer = createReducer(ACTION_HANDLES, initialState)
export default categoriesReducer;