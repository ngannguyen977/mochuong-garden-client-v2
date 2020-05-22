import * as Types from '../../constants/actionTypes';
import * as Message from '../../constants/message';

export const actAddMessage =(message)=>{
    // this.Message.MSG_ADD_SUCCESS)
    return {
        type: Message.MSG_ADD_SUCCESS,
        message
    }
} 
export const actDeleteMessage = (message)=>{
    return{
        type: Message.MSG_CONFIRM,
        message
    }
}
var initialState = "";
const MessageReducer = (state=initialState, action)=> {
 switch(action.type){
    case Message.MSG_ADD_SUCCESS:
        //trong action có
        return  action.message
    case Message.MSG_CONFIRM:
        console.log("meassage delete",action.message)
        return action.message
        
    default: return state;
 }

}

export default MessageReducer;
