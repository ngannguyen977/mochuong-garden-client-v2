import React from 'react';
import './shopping-cart.scss'; 

class Payment extends React.Component {
    render(){
      return (
          <div className="cart-page">
               <div className="title-status">
                    <h3>Thông tin người nhận và thanh toán</h3>
                    <p>Vui lòng điền các thông tin theo mẫu để Mộc Nhiên Farm có thể gửi hàng đến địa chỉ của bạn. 
                    Sau khi hoàn thành, click Gửi đơn hàng để gửi thông tin tới chúng tôi.</p>
                </div>
              <div className= "container">
                    <form>
                        <div className="form-group">
                            <input type="text" required="required"/>
                            <label htmlFor="input" className="control-label">Họ tên người nhận</label><i className="bar"></i>
                        </div>
                        <div className="form-group">
                            <input type="text" required="required"/>
                            <label htmlFor="input" className="control-label">Điện thoại</label><i className="bar"></i>
                        </div>
                        <div className="form-group">
                            <input type="text" required="required"/>
                            <label htmlFor="input" className="control-label">Địa chỉ</label><i className="bar"></i>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <select>
                                    <option>HCM</option>
                                    <option>Hà Nội</option>
                                </select>
                                <label htmlFor="select" className="control-label">Tỉnh thành</label><i className="bar"></i>
                            </div>
                            <div className="col-md-6 form-group">
                                <select>
                                    <option>Quận 1</option>
                                    <option>Quận 1</option>
                                </select>
                                <label htmlFor="select" className="control-label">Quận Huyện</label><i className="bar"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea required="required"></textarea>
                            <label htmlFor="textarea" className="control-label">Lời nhắn:</label><i className="bar"></i>
                        </div>
                        <div className="txt-small-note">
                            <p className="small-text">Đơn hàng của bạn cần đạt giá trị nhỏ nhất là 150,000 đ . Chi tiết xin vui lòng tham khảo tại đây.</p>
                        </div>
                        <button className="btn-cart">Gửi đơn hàng</button>
                        <div className="txt-note">
                            <p>Mộc Nhiên Farm giao hàng tận nhà trên toàn quốc. Các hình thức thanh toán được chấp nhận là Thanh toán sau khi nhận hàng (COD) hoặc Chuyển khoản qua ngân hàng.
                            Khách hàng có thể an tâm, tin tưởng vào chất lượng cây trồng do Mộc Nhiên Farm sản xuất cũng như Cam kết và Chính sách bảo hành của chúng tôi.</p>
                            <p>Đơn hàng sau khi gửi đi sẽ được chúng tôi xử lý. Trong vòng 1h sau khi đặt hàng, các bạn sẽ nhận được tin nhắn xác nhận hoàn tất đơn hàng từ phía chúng tôi.</p>
                            <p>Nếu có thắc mắc trong quá trình đặt hàng, xin tham khảo Hướng dẫn đặt hàng, hoặc liên hệ trực tiếp với chúng tôi qua hệ thống chat online trên Website, hoặc Messenger tại Fanpage.
                            Tham khảo Phí ship, Giá trị tối thiểu cho một đơn hàng và Chính sách chiết khấu tại đây.</p>
                        </div>
                </form>
              </div>
          </div>
      );
    }
  
  }
  
  export default Payment;
  