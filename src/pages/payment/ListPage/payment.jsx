import React from 'react';
import '../payment.scss';
import '../../common.scss';
import {mapDispatchToProps, mapStateToProps} from '../container';
import {connect} from 'react-redux';
// import  MessageComponent  from '../../share/messages/message.jsx';

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Payment extends React.Component {
    componentDidMount(){
    }
    onSendCart =(e,user)=>{
        e.preventDefault();
        // console.log('user nnnnnnnnnnnnnnnnnn', user)

        this.props.sendCart(user)
    }
    onChange=(e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]:value
        })
    }
    render() {
        let user = this.state;
       
        return (
            <div className="cart-page">
                <div className="title-status">
                    <h4>Thông tin người nhận và thanh toán</h4>
                    <p>Vui lòng điền các thông tin theo mẫu để Mộc Nhiên Farm có thể gửi hàng đến địa chỉ của bạn.
                    Sau khi hoàn thành, click Gửi đơn hàng để gửi thông tin tới chúng tôi.</p>
                </div>
                <div className="container">
                    <div>
                        <div className="form-group">
                            <input 
                            type="text" 
                            name = 'name'
                            required="required" 
                            onChange={(e)=>this.onChange(e)}
                            />
                            <label htmlFor="input" className="control-label">Họ tên người nhận</label><i className="bar"></i>
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            name="phone"
                            required="required" 
                            onChange={(e)=>this.onChange(e)}
                            />
                            <label htmlFor="input" className="control-label">Điện thoại</label><i className="bar"></i>
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            required="required"
                            name="address"
                            onChange={(e)=>this.onChange(e)}
                             />
                            <label htmlFor="input" className="control-label">Địa chỉ</label><i className="bar"></i>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <select 
                                name="city"
                                onChange={(e)=>this.onChange(e)}
                                >
                                    <option>HCM</option>
                                    <option>Hà Nội</option>
                                </select>
                                <label htmlFor="select" className="control-label">Tỉnh thành</label><i className="bar"></i>
                            </div>
                            <div className="col-md-6 form-group">
                                <select 
                                name="district"
                                onChange={(e)=>this.onChange(e)}
                                >
                                    <option>Quận 1</option>
                                    <option>Quận 1</option>
                                </select>
                                <label htmlFor="select" className="control-label">Quận Huyện</label><i className="bar"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <h5>Lời nhắn cho Farm</h5>
                            <textarea 
                            name="note"
                            required="required"
                            onChange={(e)=>this.onChange(e)}
                            ></textarea>
                            <label htmlFor="textarea" className="control-label">Lời nhắn:</label><i className="bar"></i>
                        </div>
                        <div className="txt-small-note">
                            <p className="small-text">Đơn hàng của bạn cần đạt giá trị nhỏ nhất là 150,000 đ . Chi tiết xin vui lòng tham khảo tại đây.</p>
                        </div>
                        <button className="btn-green btn-pay" 
                        onClick={(e)=>this.onSendCart(e,user)}>Gửi đơn hàng</button>
                        <div className="txt-note">
                            <p>Cây quanh nhà giao hàng tận nhà trên toàn quốc. Các hình thức thanh toán được chấp nhận là Thanh toán sau khi nhận hàng (COD) hoặc Chuyển khoản qua ngân hàng.
                            Khách hàng có thể an tâm, tin tưởng vào chất lượng cây trồng do Mộc Nhiên Farm sản xuất cũng như Cam kết và Chính sách bảo hành của chúng tôi.</p>
                            <p>Đơn hàng sau khi gửi đi sẽ được chúng tôi xử lý. Trong vòng 1h sau khi đặt hàng, các bạn sẽ nhận được tin nhắn xác nhận hoàn tất đơn hàng từ phía chúng tôi.</p>
                            <p>Nếu có thắc mắc trong quá trình đặt hàng, xin tham khảo Hướng dẫn đặt hàng, hoặc liên hệ trực tiếp với chúng tôi qua hệ thống chat online trên Website, hoặc Messenger tại Fanpage.
                            Tham khảo Phí ship, Giá trị tối thiểu cho một đơn hàng và Chính sách chiết khấu tại đây.</p>
                        </div>
                    </div>
                </div>
                {/* <MessageComponent/> */}
            </div>
        );
    }

}

export default Payment;
