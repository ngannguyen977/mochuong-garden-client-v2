import { createAction, createReducer } from "redux-act"
import flickr from '../flickr';

const UPLOAD_ACTION = createAction(`UPLOAD`)

export const upload = (formData)=>{
    return(dispatch)=>{
        flickr.upload(formData).then(res=>{
            // console.log("upload",formData,res )
            dispatch(UPLOAD_ACTION(res))
        })
    }
}
const initalState ={};
const ACTION_HANDLES = {
    [UPLOAD_ACTION]:(state,res)=>{
        return{...state, res}
    }
}
let reducer = createReducer(ACTION_HANDLES, initalState)
export default reducer