import { v4 as uuidv4 } from 'uuid';
import { push } from 'react-router-redux'
import { createAction, createReducer } from "redux-act"
import database from '../firebaseConnect';
// tao action
const ACTION_LIST = createAction(`PRODUCT_LIST`)
const ACTION_DETAIL = createAction(`PRODUCT_DETAIL`)
const ACTION_ADD = createAction(`PRODUCT_ADD`)
const ACTION_EDIT = createAction(`PRODUCT_EDIT`)
const ACTION_DELETE = createAction(`PRODUCT_DELETE`)

export const list = (pageIndex = 0, conto) => {
	return (dispatch) => {
		// call api get list page here
		database.getData(pageIndex).then(products => {
			console.log('list from store', products)
			dispatch(ACTION_LIST(products))
		})

	}
}
export const add = (product) => {
	return (dispatch,getState) => {
		product.id = uuidv4();
		product.createdAt = new Date().toString();
	
		let result = database.addData(product)
		console.log('result', result)
		dispatch(ACTION_ADD(result))
		// sau khi tao xong, back ve trang list
		dispatch(push('/products'))
	}
}
export const deleteData = (id) => {
	return (dispatch,getState) => {
		let result = database.deleteData(id)
		console.log('result', result)
		dispatch(ACTION_DELETE(result))
		dispatch(list())
		
	}
}
export const getDataById = (id) => {
	return (dispatch,getState) => {
		database.getOne(id).then(products => {
			dispatch(ACTION_EDIT(products))
		})
		
	}
}
export const update = (id,product) => {
	return (dispatch,getState) => {
		let result = database.updateData(id,product)
		dispatch(ACTION_EDIT(result))
		// sau khi tao xong, back ve trang list
		dispatch(push('/products'))
	}
}
const initialState = {}
const ACTION_HANDLES = {
	[ACTION_LIST]: (state, products) => {
		console.log('old state', state)
		console.log('new state', products)
		return { ...state, products }
	},
	[ACTION_ADD]: (state, product) => {
		return { ...state, product }
	},
	[ACTION_DELETE]: (state, product) => {
		return { ...state, product }
	},
	[ACTION_EDIT]: (state, product) => {
		return { ...state, product }
	},
}
let productPageReducer = createReducer(ACTION_HANDLES, initialState)
export default productPageReducer