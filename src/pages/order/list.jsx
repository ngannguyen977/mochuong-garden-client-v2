import React from "react"
import { mapStateToProps, mapDispathToProps } from "./container"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

// styling
// import "../../../resources/style.scss"
import "./order.scss"


@connect(
    mapStateToProps,
    mapDispathToProps,
)
class ListPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.listOrderFromStore();
    }
    showOrderList = (listOrder = []) => {
        console.log("listorder component", listOrder)
        var result = null;
        if (listOrder.length > 0) {
            result = listOrder.map((order, index) => {
                return <a className="col-md-12 item-table" key={index}>
                    <div className="order-title">
                        <div className="col-md-6 order-id">ID đơn hàng:{order.id}</div>
                        <div className="col-md-6 order-date">Ngày tạo:{order.orderDate}</div>
                    </div>
                    <div className="ordder-content">
                        <div className="item-info col-md-6">{this.showOrderItem(order.orderItems)}</div>
                        <div className="col-md-3 item-total">{order.total}</div>
                        <div className="col-md-3 action">
                        <Link to={'/orders/orderDetail'} 
                            type="button" 
                            className="btn btn-success">Chi tiết đơn hàng</Link>
                        </div>
                    </div>
                </a>
            })
            return result;
        }
    }
    showOrderItem = (listOrderItem =[])=>{
        console.log("listOrderItem component", listOrderItem)
        var result = null;
        if (listOrderItem.length > 0) {
            result = listOrderItem.map((orderItem, index) => {
                return <div className="orderItem">
                            <div className="item-img"></div>
                            <div className="item-name">{orderItem.product.displayName}</div>
                            <div className="item-quantity">X{orderItem.product.quantity}</div>
                        </div>
            })
            return result;
        }
    }
    showPagination = (totalPage = 0) => {
        console.log("order totalPage", totalPage)
        let pagination = []
        for (let i = 0; i < totalPage; i++) {
            pagination.push(<li key={i} className="page-item" >
                <a className="page-link" href="#" onClick={() => this.props.listOrderFromStore(i)}>{i + 1}</a>
            </li>)
        }
        return <ul className="pagination pagination-lg">
            {pagination}
        </ul>
    }
    render() {
        const { totalPage, dataPaging } = this.props;
        console.log("order component".datapaging)
        return (
            <div className='thing'>
                <section className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Bạn cần tìm..."
                                    name="keyword"
                                />
                                <button type="button" className="btn btn-info">Tìm</button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className=''>
                            <div className="table table-hover">
                                <div className="table-head">
                                    <th className="product-order-info">SP</th>
                                    <th className="product-order-total">Tổng Đơn hàng</th>
                                    <th className="product-order-action">Action</th>
                                </div>
                                <div>
                                    {this.showOrderList(dataPaging)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="float-right">
                        <nav aria-label="...">
                            {this.showPagination(totalPage)}
                        </nav>
                    </div>
                </section>
            </div>
        )
    }
}

export default ListPage
