import {connect} from 'react-redux';
import MessageComponent from './message';
// import ProductDetail from '../../pages/product-detail/product-detail';
import "./message.scss";

const mapStateToProps = state =>{
    console.log("state of message",state)
    return {
        message: state.MessageReducer //lam gi co state.message 
    }
    
}

export default connect(mapStateToProps, null)(MessageComponent)

