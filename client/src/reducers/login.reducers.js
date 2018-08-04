import {userConstant} from "../constants/action-types";

const initialState = {
    type: '',
    message: '',
    isAuthenticated: '',
};

export const login = (state = initialState, action) => {
    switch(action.type){
        case userConstant.LOGIN_SUCCESS:
            return {
                 type: 'alert alert-success', message: action.message, isAuthenticated: true
            }
        case userConstant.LOGIN_FAILED:
            return{
                type: 'alert alert-failed', message: action.error, isAuthenticated: false
            }
        default:
            return state;    
    }
}
