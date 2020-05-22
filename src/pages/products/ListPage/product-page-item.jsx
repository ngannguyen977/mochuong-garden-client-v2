import React from 'react';
import {Link} from 'react-router-dom';

class ProductPageItem extends React.Component {
    
  render(){
    //nhận prop từ product list
    var {product} = this.props;
    console.log("product item data", this.props)
    // console.log("item quantity",item.quantity)
    let canBuy = product.quantity > 0;
    return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-page-item">
               <Link to={'/productDetail/'+product.id}>
                    {/* <img className="product-img img-responsive" src={product.image} /> */}
                    <h4>{product.displayName}</h4>
                    <p>{product.description}</p>
                    <div className="box-bottom">
                        <span className="price"><p>{product.price}</p></span>
                        <div className="fl-right">
                          { canBuy ? <button className="btn btn-green">MUA HÀNG</button> : <span className="lbl-action">HẾT HÀNG</span>}
                        </div>
                    </div>
               </Link>
              
            </div>
           
    );
  }
  

}

export default ProductPageItem;
