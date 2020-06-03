import { getDataById } from "reducers/product";
import {addToCart} from "reducers/cart";
import {showMessage} from "reducers/message"
export const mapStateToProps = (state, props) => {
let product = state.productPageReducer.product || {};
  return {
    productDetail: product,
  }
}
export const mapDispatchToProps = {
  getDataById:(id) =>getDataById(id),
  onAddToCart:(product)=>addToCart(product),
  showMessage:(message)=>showMessage(message)
}
export default { mapStateToProps, mapDispatchToProps }

