import {userConstant} from "../constants/action-types";


export const login = (state = {}, action) => {
    switch(action.type){
        case userConstant.LOGIN_SUCCESS:
            return {
                  type: 'alert alert-success', message: action.message
            }
        case userConstant.LOGIN_FAILED:
            return{
                type: 'alert alert-failed', message: action.error
            }
        default:
            return state;    
    }
}
