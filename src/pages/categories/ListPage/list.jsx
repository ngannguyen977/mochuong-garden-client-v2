import React from "react"
import { mapStateToProps, mapDispatchToProps } from "../container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ProductCategoriesItem from './product-categories-item'
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }

  }
  componentDidMount() {
    this.props.categoriesFromStore();
   
  }
  showProductCategories(listCategories=[]){
    var result = null;
    if(listCategories.length>0){
      console.log("tô ngu như bò")
      result = listCategories.map((category, index)=>{
        return (
          <ProductCategoriesItem 
            key={index}
            category = {category}
          />
        )
      })
    }
    return result;///////////////NOTE///////////////
  }
  render() {
    var { listCategories } = this.props;
    console.log('component category aaaaaaaaaaaaaaaaaaaaaaaaaa',listCategories)
    return (
      <div>
        {this.showProductCategories(listCategories)}
      </div>
    );
  }
}
export default CategoryPage 