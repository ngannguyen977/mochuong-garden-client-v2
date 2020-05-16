import {orderList} from "reducers/order";

export const mapStateToProps = (state, props) => {
  let orders = state.ordersReducer.orders || {}
  return {
    listOrder : orders,
    dataPaging: orders.dataPaging,
    totalItem: orders.totalItem,
    totalPage: orders.totalItem/5
  }
}
export const mapDispathToProps = {
    listOrderFromStore:(pageIndex)=>orderList(pageIndex)
}
export default { mapStateToProps, mapDispathToProps }

