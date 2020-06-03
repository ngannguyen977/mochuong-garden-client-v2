export const MESSAGE = {
    MSG_CART_EMPTY: " chưa có sp nào trong giỏ hàng",
    MSG_ADD_SUCCESS: "Sản phẩm đã được thêm vào giỏ hàng",
    MSG_DELETE_SUCCESS: "Xóa sản phẩm khỏi giỏ hàng thành công",
    MSG_CONFIRM: " Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng",
    MSG_CART_EMPTY: "số lượng không hợp lệ",
    MSG_CART_LIMIT: "Sản phâm trong kho không đủ",
    MSG_CART_INVALID: "Sản phâm không tồn tại",
    MSG_CART_COMPLETE: "Đơn hàng đã được gửi cho farm !",
}

import {createAction, createReducer} from "redux-act";

const ACTION_SHOW_MESSAGE = createAction('ACTION_SHOW_MESSAGE0');

export const showMessage = (message)=>{
    return (dispatch)=>{
        dispatch(ACTION_SHOW_MESSAGE(message))
        // invisible after 1s
        setTimeout(() => {
            dispatch(ACTION_SHOW_MESSAGE())
        }, 1000);
    }
}
const initialState={}
const ACTION_HANDLES = {
    [ ACTION_SHOW_MESSAGE]:(state, message)=>{
        return{...state, message}
    }
}
let messageReducer = createReducer(ACTION_HANDLES, initialState)
export default messageReducer;