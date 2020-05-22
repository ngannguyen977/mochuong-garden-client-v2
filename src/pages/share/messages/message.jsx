import React, {Component} from 'react';
import "./message.css"
class MessageComponent extends Component {
    render(){
    var {message} = this.props;
    console.log("message componet", this.props)
        return (
            <div className="message-wrapper">
              {message   && (<h3>
                    <i className="icon-check fas fa-check"></i>
                    <button>Hủy bỏ</button>
                    <button>Đồng ý</button>
                {message}</h3>)}
            </div>
            
        )

    }
}
export default MessageComponent;