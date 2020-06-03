import {showMessage} from "reducers/message";

export const mapStateToProps = state =>{
    return {
     message: state.messageReducer.message
    }
}
export const mapDispatchToProps= {
    showMessage:(message)=>showMessage(message)
}
export default { mapStateToProps, mapDispatchToProps }

