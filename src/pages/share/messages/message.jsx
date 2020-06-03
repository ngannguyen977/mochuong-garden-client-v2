import React, { Component } from 'react';
import "./message.css"
import { mapStateToProps, mapDispatchToProps } from "./container"
import { connect } from "react-redux";

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class MessageComponent extends Component {
    constructor() {
        super()
    }
    render() {
        var { message } = this.props;
        console.log('messsage in compoment', message)
        return (
            <div className="message-wrapper">
                {message && (<h3>
                    <i className="icon-check fas fa-check"></i>
                {message}</h3>)}
            </div>

        )

    }
}
export default MessageComponent;