import {userConstant} from '../constants/action-types';

const initialState = {
    type: '',
    message: '',
}

export const registration = (state = initialState, action) => {
    switch (action.type) {
        case userConstant.REGISTRATION_SUCCESS:
            return {
                state: { type : 'alert alert-success', message: action.message }
                };
            
            
        case userConstant.REGISTRATION_FAILED:
            return {
                state: { type : 'alert alert-error', message: action.error }
            };

            default:
            return state;
    }
}