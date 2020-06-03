import React from 'react';
import { Link } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from "../container";
import  MessageComponent  from '../../share/messages/message.jsx';
import { connect } from "react-redux";
import "../product-detail.scss";
import {MESSAGE} from "reducers/message"

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // lấy id trên URL để show detail của id đó
        let id = this.props.match.params.id
        this.props.getDataById(id)

    }
    onAddToCart = (product) => {
        this.props.onAddToCart(product)
        this.props.showMessage(MESSAGE.MSG_ADD_SUCCESS)
    }
    render() {
        let productDetail = this.props.productDetail || {};
        let canBuy = productDetail.quantity > 0;
        console.log("lấy props", this.props)
        return (
            <div className="container">
                <div className="product-item-detail">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <Link to={'/'} classname="back-to-home">Về trang chủ</Link>
                        <img className="img-responsive" src={productDetail.coverSrcx1} />
                        <h3>{productDetail.displayName}</h3>
                        <p>{productDetail.description}</p>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="card-right">
                            <table className="table tbl-product-detail">

                                <thead>THÔNG TIN SẢN PHẨM</thead>
                                <tbody>
                                    <tr>
                                        <td>Mã SP</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Đặc tính</td>
                                        <td>Ưa nắng</td>
                                    </tr>
                                    <tr>
                                        <td>Giá bán</td>
                                        <td>2000</td>
                                    </tr>
                                    <tr>
                                        <td>Chiều Cao</td>
                                        <td>30cm</td>
                                    </tr>
                                    <tr>
                                        <td>Tình Trạng</td>
                                        <td>3 cây</td>
                                    </tr>
                                </tbody>
                            </table>
                            {canBuy ? <a className="btn btn-green"
                                onClick={() => this.onAddToCart(productDetail)}
                            >Mua Hàng</a> : <span className="lbl-action">SẢN PHẨM HẾT HÀNG</span>}

                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <MessageComponent/>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
