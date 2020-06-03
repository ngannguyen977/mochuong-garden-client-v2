import React from 'react';
import {Link} from 'react-router-dom';
import './product-page.scss';
class ProductPageItem extends React.Component {
    
  render(){
    //nhận prop từ product list
    var {product} = this.props;
    // asdfasfconsole.log("item quantity",item.quantity)
    let canBuy = product.quantity > 0;
    let img = 'https://1.bp.blogspot.com/-tJMkt3zEb8w/WRSMPa9PWcI/AAAAAAAAFk0/hUiCPT_y8UoofFiXWwvEPm9vXcOl9B62ACEw/s1600/cover%2B3.jpg';
    if(product.image){
      img=product.image
    }
    return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-page-item">
               <Link to={'/products/'+product.id}>
                    <img className="product-img img-responsive" src={img} />
                    <h5 className="product-name">{product.displayName}</h5>
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
