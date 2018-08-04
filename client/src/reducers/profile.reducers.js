import {alertConstant} from '../constants/alert-constant';

export const profile = (state = {}, action) => {

    switch(action.type){
        case alertConstant.SUCCESS:
            return{
                state: {message: action.message}
            }

        case alertConstant.ERROR:
            return{
                state: {message: action.error}
            }
        default: 
            return state;
    }

}