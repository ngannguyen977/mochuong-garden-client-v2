
import {addToCart,cartDetail,deleteItemCart, updateQuantity } from 'reducers/cart'

const showAllQuantity = (cart=[]) => {
  var allQuantity = 0;
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      //lấy số lượng từng phần tử cộng dồn lại
      allQuantity += cart[i].quantity
    }
  }
  return allQuantity
}

export const mapStateToProps = (state, props) => {
  let cart = state.CartReducer
  return {
    // key(props để sd): cart trái
    // value: cart phải
    // ở đâu ta có cart là 1 props lên store lấy ds các cart về
    cart: cart,
    // cart: state.CartReducer
    allQuantity: showAllQuantity(cart)
  }
}
export const mapDispathToProps = {
  cartDetail:(product)=>cartDetail(product),
  addToCart:(product)=>addToCart(product),
  deleteItemCart:(product)=>deleteItemCart(product),
  updateQuantity:(product)=>updateQuantity(product),

}
export default { mapStateToProps, mapDispathToProps }

