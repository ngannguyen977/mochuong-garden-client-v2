import React from 'react';
import './categories.css';
class ProductCategoriesItem extends React.Component {
  render(){
    var {category} = this.props;
    return (
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <button className="product-categories-item"
        //lấy props này trực tiếp trong product-page-reducer
          onClick={()=> this.props.getProductPageListFromStore(category.categoryId,0)}
        >
             <img className="img-responsive" src={category.image}/>
             <div>
              <h4>{category.name}</h4>
              <h5 className="quantity">{category.quantity}+</h5>
             </div>
           </button>
      </div>

    );
  }

}

export default ProductCategoriesItem;
