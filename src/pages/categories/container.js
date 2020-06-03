import { listCategory} from "reducers/categories";

export const mapStateToProps =(state, props)=>{
    
    let categories = state.categoriesReducer.categories || {}
    console.log("listCategories trong containerxxxxxxxxxxxxxxxx", categories)

    return {
        listCategories: categories.list
        
    }
}
export const mapDispatchToProps = {
   categoriesFromStore:()=>listCategory(),
}
export default { mapStateToProps, mapDispatchToProps }