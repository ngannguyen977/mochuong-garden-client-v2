import { v4 as uuidv4 } from 'uuid';
import { createAction, createReducer } from "redux-act";
import database from '../firebaseConnect';
import { MESSAGE, showMessage } from 'reducers/message'


const ACTION_DETAIL = createAction(`CART_DETAIL`)
const ACTION_ADD_TO_CART = createAction(`CART_ADD_TO_CART`)
const ACTION_DELETE_PRODUCT_CART = createAction(`CART_DELETE_PRODUCT_CART`)
const ACTION_UPDATE_QUANTITY = createAction(`CART_UPDATE_QUANTITY`)
const ACTION_DELETE_CART = createAction(`ACTION_DELETE_CART`)



var findProductInCart = (cart = [], product) => {
    console.log('cart error', cart)
    // index = -1 là ko tìm thấy
    var index = -1;
    if (cart != null && cart.length > 0) {
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
        let cartDetailInLocalStore = localStorage.getItem('CART' || "[]")
        var data = JSON.parse(cartDetailInLocalStore);
        dispatch(ACTION_DETAIL(data))
    }
}
//
export const getCartLocalStorage = () => {
    return (dispatch) => {
        let cartInLocalStorage = localStorage.getItem('CART') || "[]"
        var data = JSON.parse(cartInLocalStorage) ;
        dispatch(ACTION_DETAIL(data))
    }
}
export const addToCart = (product) => {
    return (dispatch) => {
        // get giỏ hàng từ localstore
        var cart = JSON.parse(localStorage.getItem('CART'));
        if (!cart) {
            cart = []
        }
        //tìm sp
        var index = findProductInCart(cart, product)
        //nếu tìm thấy sp thì cộng dồn vào
        //ngược lại thêm dòng mới
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            // console.log("shopping cart reducer ",action)
            //product và quantity lấy trong action
            var cartItem = {
                product: product,
                quantity: 1
            }
            cart.push(cartItem)
        }
        // set vào localStorage
        localStorage.setItem('CART', JSON.stringify(cart))
        // luu vao store
        dispatch(ACTION_ADD_TO_CART(cart))
    }
}
export const deleteCart = (cart)=>{
    return(dispatch)=>{
        // xoa trong store
        dispatch(ACTION_DELETE_CART());
        // xxoa trong local
        localStorage.setItem('CART',[])
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

export const updateQuantity = (product, quantity = 1, buyQuantity) => {
    return (dispatch) => {
        let storeQuantity = product.quantity
        let canBuy = buyQuantity + quantity
        if (canBuy < 0) {
            dispatch(showMessage(MESSAGE.MSG_CART_EMPTY))
            return
        }
        if (canBuy > storeQuantity) {
            dispatch(showMessage(MESSAGE.MSG_CART_LIMIT))
            return
        }
        // get cart trong local
        var cart = JSON.parse(localStorage.getItem('CART'));
        //tim id sp can xoa
        var index = findProductInCart(cart, product);
        if (index === -1) {
            dispatch(showMessage(MESSAGE.MSG_CART_INVALID))
            return
        }
        // = quantity moi (phải) được chuyền vào từ action
        cart[index].quantity += quantity
        localStorage.setItem('CART', JSON.stringify(cart))
        dispatch(ACTION_UPDATE_QUANTITY(cart))
    }
}
// truyền tham số user từ input trong component 
export const sendCart = (user) => {
    return (dispatch) => {
        // get cart from local storage
        let cart = JSON.parse(localStorage.getItem('CART'));
        // if cart empty => do nothing
        if(!cart){
            dispatch(showMessage(MESSAGE.MSG_CART_INVALID))
            return
        }
        // create user
        // let chỉ khai báo 1 lần 
        let result = database.addUser(user);
        // create order 
        let order ={
            id:uuidv4(),
            orderDate:new Date().toString(),
            total:showAllTotal(cart)
          }

         result = database.addOrder(order);
        // create list order items
        // trong cart có nhiều orderItem
        cart.map(productItem=>{
            let orderItem = {
                orderId:order.id,
                productId:productItem.product.id,
                imgUrl:productItem.product.imageURL || "",
                productName:productItem.product.displayName || "",
                priceUnit:productItem.product.price || 0,
                quantityStore:productItem.product.quantity || 0,
                //số lương mua xem trong cart
                quantityBuy:productItem.quantity,
                //truyền value
                subTotal:showTotal(productItem.product.price,productItem.quantity)
    
            }
            result = database.addOrderItem(orderItem);
        })
        
        // show success message
        dispatch(showMessage(MESSAGE.MSG_CART_COMPLETE))
        // xoa gio hang
        dispatch(deleteCart())
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
    [ACTION_DELETE_CART]: (state) => {
        return { ...state, cart:[]}
    },

}
let cartReducer = createReducer(ACTION_HANDLES, initialState)
export default cartReducer

//subTotal
export const showTotal = (price, quantity)=>{
    return price * quantity
}
//allTotal
export const showAllTotal=(cart)=>{
	var total = 0;
	if(cart && cart.length>0){
		for(var i=0; i< cart.length; i++){
			//lấy giá từng phần tử * số lượng và cộng dồn lại
			total +=cart[i].product.price*cart[i].quantity
		}
	}
	return total;
  }