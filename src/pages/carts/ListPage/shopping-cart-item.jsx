import React, { Component } from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps} from "../container";
import  MessageComponent  from '../../share/messages/message.jsx';
import './shopping-cart.scss';
@connect(
	mapStateToProps,
	mapDispatchToProps,
  )
class CartItem extends Component {
    
    // nhan vao price va quantity
    showTotal = (price, quantity)=>{
        return price * quantity
    }
    onDeleteCart = (product, message)=>{
        console.log("click xóa", product)
        // var {onDeleteProductInCart, onShowConfirmMessage} = this.props;
        this.props.deleteItemCart(product)
        // this.onShowConfirmMessage(Message.MSG_CONFIRM)
        // or this.props.onDeleteProductInCart(product)
    }
    //                15           1,-1 15
    onUpdateQuantity=(product,quantity,buyQuantity)=>{
        this.props.updateQuantity(product, quantity,buyQuantity);
    }

    render() {
        var {product} = this.props;

        return (
                <tr>
                    <td><img className="img-cart img-responsive" src={product.product.image} /></td>
                    <td data-quantity={product.product.quantity}>{product.product.displayName}</td>
                    <td>{product.product.price}</td>
                    <td>{product.product.quantity}</td>
                    <td>
                        <div className="quantity">
                            <button className="minus-quantity"
                             onClick = {()=>this.onUpdateQuantity(product.product, -1, product.quantity)}>
                                <i className="fas fa-minus"></i>
                               
                            </button>
                           
                            <input className="txt-quantity" type="text" value={product.quantity} />
                            <button className="add-quantity"
                            onClick = {()=>this.onUpdateQuantity(product.product, 1, product.quantity)}
                            >
                                <i className="fas fa-plus"></i>
                                
                            </button>
                        </div>
                    </td>
                    <td>{this.showTotal(product.product.price, product.quantity)}</td>
                    <td>
                        <div className="action">
                            <button className="btn"
                            onClick = {()=>this.onDeleteCart(product.product)}
                            >
                               Xóa
                            </button>
                        </div>
                    </td>
                   <MessageComponent/>
                </tr>
        );
    }
}

export default CartItem;
