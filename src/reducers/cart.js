import { createAction, createReducer } from "redux-act"
import database from '../firebaseConnect';

const ACTION_DETAIL = createAction(`CART_DETAIL`)
const ACTION_ADD_TO_CART = createAction(`CART_ADD_TO_CART`)
const ACTION_DELETE_PRODUCT_CART = createAction(`CART_DELETE_PRODUCT_CART`)
const ACTION_UPDATE_QUANTITY = createAction(`CART_UPDATE_QUANTITY`)

var findProductInCart = (cart, product) => {
    // index = -1 là ko tìm thấy
    var index = -1;
    if (cart.length > 0) {
        //lấy id của từng sp trong cart ra xem có trùng id với sp mua thêm ko
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.id === product.id) {
                index = i;
                break;
            }
        }
    }
    return index;
}


export const cartDetail = () => {
    return (dispatch) => {
        var data = JSON.parse(localStorage.getItem('CART'));
        dispatch(ACTION_DETAIL(data))
    }
}
export const addToCart = (product) => {
    return (dispatch) => {
        // get giỏ hàng từ localstore
        var cart = JSON.parse(localStorage.getItem('CART'));
        //tìm sp
        var index = findProductInCart(cart, product)
        //nếu tìm thấy sp thì cộng dồn vào
        //ngược lại thêm dòng mới
        if (index !== -1) {
            cart[index].quantity += quantity;
        } else {
            // console.log("shopping cart reducer ",action)
            //product và quantity lấy trong action
            cart.push({
                product,
                quantity
            })
        }
        // set vào localStorage
        localStorage.setItem('CART', JSON.stringify(cart))
        // luu vao store
        dispatch(ACTION_ADD_TO_CART(cart))
    }
}
export const deleteItemCart = (product) => {
    return (dispatch) => {
        // get cart trong local
        var cart = JSON.parse(localStorage.getItem('CART'));
        //tim id sp can xoa
        var index = findProductInCart(cart, product);
        if (index !== -1) {
            cart.splice(index, 1)
        }
        localStorage.setItem('CART', JSON.stringify(cart))
        dispatch(ACTION_DELETE_PRODUCT_CART(cart))
    }
}

export const updateQuantity = (product) => {
    return (dispatch) => {
        // get cart trong local
        var cart = JSON.parse(localStorage.getItem('CART'));
        //tim id sp can xoa
        var index = findProductInCart(cart, product);
        if (index !== -1) {
            // = quantity moi (phải) được chuyền vào từ action
            cart[index].quantity = quantity
            localStorage.setItem('CART', JSON.stringify(cart))
        }
        dispatch(ACTION_UPDATE_QUANTITY(cart))
    }
}
var initialState = []
const ACTION_HANDLES = {
    [ACTION_DETAIL]: (state, cart) => {
        return { ...state, cart }
    },
    [ACTION_ADD_TO_CART]: (state, cart) => {
        return { ...state, cart }
    },
    [ACTION_DELETE_PRODUCT_CART]: (state, cart) => {
        return { ...state, cart }
    },
    [ACTION_UPDATE_QUANTITY]: (state, cart) => {
        return { ...state, cart }
    },
    
}
let cartReducer = createReducer(ACTION_HANDLES, initialState)
export default cartReducer


