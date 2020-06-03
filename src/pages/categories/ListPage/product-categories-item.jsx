import React from 'react';
import './categories.css';
class ProductCategoriesItem extends React.Component {
  render(){
    var {category} = this.props;
    // console.log('component category 0000000000000000000000000',this.props)
    let img = 'https://media3.scdn.vn/img3/2019/3_6/heQoV2_simg_de2fe0_500x500_maxb.jpg'
    if(category.image){
      img = category.image;
    }
    return (
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <button className="product-categories-item"
        //lấy props này trực tiếp trong product-page-reducer
          onClick={()=> this.props.getProductPageListFromStore(category.categoryId,0)}
        >
             <img className="img-responsive" src={img}/>
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
