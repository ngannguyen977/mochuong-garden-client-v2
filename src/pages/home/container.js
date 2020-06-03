//import { list, add, deleteCate, updateCate, getCateById,searchCate} from "reducers/categories";

export const mapStateToProps =(state, props)=>{
    //let categories = state.categoriesReducer.categories || {}
    return {
        // // listCategories: categories.list
        // dataPaging:categories.dataPaging,
        // categoryUpdate:state.categoriesReducer.category || {},
        // listCate:categories.list || []
    }
}
export const mapDispatchToProps = {
   categoriesFromStore:(pageIndex)=>list(pageIndex),
   addCategory:(category)=>add(category),
   deleteCategory:(id)=>deleteCate(id),
   getCateById:(id)=>getCateById(id),
   updateCategory:(id, category)=>updateCate(id, category),
   searchCategory:(keyword)=>searchCate(keyword)
}
export default { mapStateToProps, mapDispatchToProps }