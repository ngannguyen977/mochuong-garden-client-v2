import { list, add, deleteData,getDataById,update } from "reducers/product"


export const mapStateToProps = (state, props) => {
let products = state.productPageReducer.products || {}
  return {
    listProduct: products.list,
    pageIndex:products.pageIndex,
    totalItem:products.totalItem,
    dataPaging: products.dataPaging,
    totalPage:products.totalItem/5,
    productUpdate:state.productPageReducer.product ||{}
  }
}
export const mapDispathToProps = {
  listFromStore: (pageIndex,conto) => list(pageIndex,conto),
  add: (product) => add(product),
  deleteData:(id)=>deleteData(id),
  getDataById:(id) =>getDataById(id),
  update:(id,product)=>update(id,product)
}
export default { mapStateToProps, mapDispathToProps }

