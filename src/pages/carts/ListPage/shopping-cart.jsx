import React from 'react';
// import * as MSG from '../../constants/message';
import { mapStateToProps, mapDispatchToProps,showAllQuantity } from "../container"
import { connect } from "react-redux";
import CartItem from './shopping-cart-item';
import { Link } from 'react-router-dom';
@connect(
	mapStateToProps,
	mapDispatchToProps,
  )
class ShoppingCart extends React.Component {
	componentDidMount(){
		this.props.cartDetail()
	}
  render(){
	  //cart lấy trên store
	var { cart } = this.props;

	console.log("có message chưa", this.props.cart)
    return (
        <div className="cart-page">
			<div className="title-status">
				<h4>Thông tin giỏ hàng</h4>
			</div>
			<div className="container">
				<table className="table table-content">
					<thead>
						<tr>
						<th colSpan="3">Sản phẩm</th>
						<th></th>
						<th></th>
						<th>Đơn giá</th>
						<th>số lượng</th>
						<th>Thành tiền</th>
						<th>Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{this.showCartItem(cart)}
					</tbody>
				</table>

				<table className="table tbl-result">
					<tbody className="pull-right">
						<tr>
							<td></td>
							<td>
								<h4>
									<strong>Tổng Tiền</strong>
									<span>({showAllQuantity(cart)} sản phẩm)</span>
								</h4>
							</td>
							<td>
								<strong className="txt-price">{this.showAllTotal(cart)}</strong>
							</td>
							<td>
							<Link to={'/payment'}>
								<button type="submit" className="btn-cart">
										Mua hàng
								</button>
							</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* <MessageContainer /> */}
        </div>
		
    );
  }
  showAllTotal=(cart)=>{
	var total = 0;
	if(cart && cart.length>0){
		for(var i=0; i< cart.length; i++){
			//lấy giá từng phần tử * số lượng và cộng dồn lại
			total +=cart[i].product.price*cart[i].quantity
		}
	}
	return total;
  }

  showCartItem =(cart) => {
	var result ;
	var {onDeleteProductInCart, onUpdateProductQuantity} = this.props
	if(cart &&cart.length>0){
		result = cart.map((item, index)=>{
			return (
				<CartItem
					key={index}
					index={index}
					product={item}
					onDeleteProductInCart={onDeleteProductInCart}
					onUpdateProductQuantity={onUpdateProductQuantity}
					/>
			)
		})
	}
	return result;
  }
}

export default ShoppingCart;
