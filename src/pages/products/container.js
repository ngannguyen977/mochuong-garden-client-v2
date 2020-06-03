import { list, add, deleteData,getDataById,update, searchPro } from "reducers/product";
import {upload} from 'reducers/upload'

export const mapStateToProps = (state, props) => {
let products = state.productPageReducer.products || {};
  return {
    listProduct: products.list,
    pageIndex:products.pageIndex,
    totalItem:products.totalItem,
    dataPaging: products.dataPaging,
    totalPage:products.totalItem/5,
    productUpdate:state.productPageReducer.product ||{},
  }
}
export const mapDispatchToProps = {
  listFromStore: (pageIndex,conto) => list(pageIndex,conto),
  add: (product) => add(product),
  deleteData:(id)=>deleteData(id),
  getDataById:(id) =>getDataById(id),
  update:(id,product)=>update(id,product),
  categoriesFromStore:(pageIndex)=>listCategory(pageIndex),
  searchProduct:(keyword)=>searchPro(keyword),
  upload:(photo)=>upload(photo)
}
export default { mapStateToProps, mapDispatchToProps }

