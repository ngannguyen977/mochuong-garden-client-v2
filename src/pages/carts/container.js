
import {addToCart,cartDetail,deleteItemCart, updateQuantity, getCartLocalStorage } from 'reducers/cart'
import{showMessage}from "reducers/message";

export const showAllQuantity = (cart=[]) => {
  var allQuantity = 0;
  if (cart.length > 0 ) {
    for (var i = 0; i < cart.length; i++) {
      //lấy số lượng từng phần tử cộng dồn lại
      allQuantity += cart[i].quantity
    }
  }
  
  return allQuantity
}

export const mapStateToProps = (state, props) => {
  // console.log('state cart', state)
  let cart = state.cartReducer.cart || []
  return {
  
    cart: cart,
    // cart: state.CartReducer
    allQuantity: showAllQuantity(cart)
  }
}
export const mapDispatchToProps = {
  cartDetail:()=>cartDetail(),
  addToCart:(product)=>addToCart(product),
  deleteItemCart:(product)=>deleteItemCart(product),
  updateQuantity:(product,quantity,buyQuantity)=>updateQuantity(product,quantity,buyQuantity),
  getCartLocalStorage:() =>getCartLocalStorage(),
  showMessage:(message)=>showMessage(message)
  
  

}
export default { mapStateToProps, mapDispatchToProps }

