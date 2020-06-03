import React from 'react';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from "../../carts/container";
import { connect } from "react-redux";
import "./menu.scss"

const menus = [
  {
    name : 'Trang chính',
    to:'/',
    exact: true
  },
  {
    name : 'Các loại cây',
    to:'/products',
    exact: false
  },
  {
    name : 'Liên hệ',
    to:'/contact',
    exact: true
  }
]
const MenuLink = ({label,to, acticOnlyWhenExact})=>{
  return (
		<Route
		path ={to}
		exact={acticOnlyWhenExact}
		children={({match})=>{
			var active = match ? 'active' :'';
			return (
				<li className ={active}>
					<Link to={to}>{label}</Link>
				</li>
			)
		}}
		/>
  )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Menu extends React.Component {
	componentDidMount(){
		// kiem tra có cart trong store chưa
		//nêu chua thi get tu local ra
		if(this.props.cart.length === 0){
			this.props.getCartLocalStorage()
		}
		this.props.allQuantity
	}
  render(){
	var {allQuantity} = this.props
    return (
        <div className="menu">
            <div className="navbar navbar-expand-lg navbar-light">
                <Link to={'/'} className="navbar-brand"><img className="img-responsive" src='/img/main_logo.png' alt="" /></Link>
                <ul className="nav navbar-nav">
					{this.showMenus(menus)}
                </ul>
          	</div>
			  <div className="search">
				<div className="search-box">
					<form className="search-form">
						<input className="form-control" placeholder='' type='text' />
						<button className="btn btn-link search-btn">
							<i className="glyphicon glyphicon-search"></i>
						</button>
					</form>
				</div>
			</div>
		  	<div className="contact-socials">
				<ul>
					<li><img className="img-responsive" src='/img/icon/facebook.png' alt="" /><span>Fanpage</span></li>
					<li><img className="img-responsive" src='/img/icon/package.png' alt="" /><span>Vận chuyển</span></li>
					<li className="cart-top">
						<Link to={'/cart'}><img className="img-responsive" src='/img/icon/shopping-bag.png' alt="" />
							<span>Giỏ hàng</span><span className="account-cart">{allQuantity}</span>
						</Link>
					</li>
				</ul>
		  </div>
		</div>
    );
  	}
	showMenus = (menus)=>{
		var result = null;
		if(menus.length>0){
			result = menus.map((menu,index)=>{
				return (
					<MenuLink
						key={index}
						label={menu.name}
						to={menu.to}
						acticOnlyWhenExact={menu.exact}
					/>
				)
			})
		}
		return result
	}
}

export default Menu;
