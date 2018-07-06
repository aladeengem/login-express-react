import {alertConstant} from '../constants/alert-constant';
import {userConstant} from '../constants/action-types';
import {user_registration} from '../services/user_action';
import {history} from '../helpers/history';
import {user_login} from '../services/user_action';

const registration = user_information => {
    return dispatch => {

        user_registration(user_information)
        .then(message => {
            dispatch(success("Registration Successful!"));
            history.push('/sign-in');
            console.log(message); 
            },
            error => {
            dispatch(failed("Failed Registration!"));
            }
        )
    }


};

const success = message => ({ type: userConstant.REGISTRATION_SUCCESS, message });
const failed = error => ({ type: userConstant.REGISTRATION_FAILED, error});

const login = (email, password) => {
    return dispatch => {
        
        user_login(email, password)
        .then(message => {
            dispatch(success_log("Login Successful"));
            console.log(message);
            history.push("/");
        }, error => {
            dispatch(failed_log("Email or password is incorrect"));

        });  
    }
}

const success_log = message => ({ type: userConstant.LOGIN_SUCCESS, message });
const failed_log = error => ({ type: userConstant.LOGIN_FAILED, error});

export const userAction = {
    registration,
    login
}


