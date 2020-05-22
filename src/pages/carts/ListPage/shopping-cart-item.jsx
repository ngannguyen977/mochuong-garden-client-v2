import React, { Component } from 'react';
import * as Message from '../../constants/message';
import MessageContainer from '../../share/messages/message-container';
import './shopping-cart.scss';

class CartItem extends Component {
    onShowConfirmMessage=(message)=>{
        this.props.onConfirmDelete(message);
    }
    
    render() {
        var {product, message} = this.props;
        var{quantity} = product;
        console.log("cart item", product)
        return (
                <tr>
                    <td><input type="checkbox" className="" /></td>
                    <td><img className="img-cart img-responsive" src={product.product.image} /></td>
                    <td>{product.product.name}</td>
                    <td>{product.product.price}</td>
                    <td>
                        
                        
                        <div className="quantity">
                            <button className="minus-quantity"
                             onClick = {()=>this.onUpdateQuantity(product.product, product.quantity -1)}>
                                <i className="fas fa-minus"></i>
                               
                            </button>
                           
                            <input className="txt-quantity" type="text" value={product.quantity} />
                            <button className="add-quantity"
                            onClick = {()=>this.onUpdateQuantity(product.product, product.quantity +1)}
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
                   
                </tr>
        );
    }
    // nhan vao price va quantity
    showTotal = (price, quantity)=>{
        return price * quantity
    }
    onDeleteCart = (product, message)=>{
        console.log("click xóa", product)
        // var {onDeleteProductInCart, onShowConfirmMessage} = this.props;
        this.props.onDeleteProductInCart(product)
        this.onShowConfirmMessage(Message.MSG_CONFIRM)
        // or this.props.onDeleteProductInCart(product)
    }
    onUpdateQuantity=(product, quantity)=>{
        var {onUpdateProductQuantity} = this.props
        if(quantity>0){
            onUpdateProductQuantity(product, quantity);
        }

    }
}

export default CartItem;
