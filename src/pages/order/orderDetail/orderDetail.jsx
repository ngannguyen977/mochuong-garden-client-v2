import React, { Component } from 'react';
import { connect } from "react-redux";
import "./orderDetail.scss"
// import { mapStateToProps, mapDispathToProps } from "../container";
// @connect(
//     mapStateToProps,
//     mapDispathToProps,
// )
class OrderDetail extends Component {
    render(){
        return(
            <div className="container">
                <h3>CHI TIẾT ĐƠN HÀNG</h3>
                <div className="tbl-row orderId">
                    <h5>Thông tin đơn hàng</h5>
                    <div>
                        <span className="txt-bold">ID đơn hàng:</span>
                        <span>afasdfas</span>
                    </div>
                    <div>
                        <span className="txt-bold">Ngày Đặt hàng:</span>
                        <span>10:00 07/05</span>
                    </div>
                </div>
                <div className="tbl-row customer-info">
                    <h5>Thông tin khách hàng</h5>
                    <p><span className="txt-bold">Họ & Tên:</span> Nguyễn Xuân Diệu </p>
                    <p><span className="txt-bold">Số ĐT:</span>84334262171</p>
                    <p><span className="txt-bold">Địa chỉ:</span>hẻm 04 Cao Thắng, khu phố 3, Phường Bình Hưng, Thành Phố Phan Thiết, Bình Thuận</p>
                </div>
                <div className="tbl-row payment-info">
                    <h5>Thanh toán</h5>
                   <div>
                       <span  className="txt-bold"> Hình thức thanh toán</span>
                       <span>COD</span>
                   </div>
                </div>
                <div className="tbl-row note">
                    <h5>Ghi chú</h5>
                   <p>
                       Không giao thứ 7, chủ nhật
                   </p>
                </div>
                <div className="tbl-row orderDetail">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th></th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><img className="img-product" /></td>
                                <td>Cây lá cẩm tím(bầu 2-3 hoặc 1 thân nhiều nhánh như hình)</td>
                                <td>30000</td>
                                <td>2</td>
                                <td>60000</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="total-info">
                        <div className ="total-price txt-bold">Tổng tiền sản phẩm: 60000</div>
                        <div className="delivery-fee txt-bold">Phí vận chuyển :30000</div>
                    </div>
                    <div className="total-payment">
                        <span className="txt-bold">Thanh toán của người mua:</span>
                        <span className="txt-bold">100000</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderDetail;
