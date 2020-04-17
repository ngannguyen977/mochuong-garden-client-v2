import { list, add, deleteCate, updateCate} from "reducers/categories";

export const mapStateToProps =(state, props)=>{
    console.log('state cate',state)
    let categories = state.categoriesReducer.categories || {}
    return {
        //listCategories: categories.list
        dataPaging:categories.dataPaging
    }
}
export const mapDispathToProps = {
   categoriesFromStore:(pageIndex)=>list(pageIndex),
   addCategory:(category)=>add(category),
   deleteCategory:(id)=>deleteCate(id),
   updateCategory:(id, category)=>updateCate(id, category)
}
export default { mapStateToProps, mapDispathToProps }