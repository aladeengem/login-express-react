import {alertConstant} from '../constants/alert-constant';
import {userConstant} from '../constants/action-types';
import {user_registration} from '../services/user_action';
import {profile} from '../services/user_action';
import {history} from '../helpers/history';
import {user_login} from '../services/user_action';

const registration = user_information => {
    return dispatch => {

        user_registration(user_information)
        .then(message => {
            dispatch(success(message));
            history.push('/sign-in');
            console.log(message); 
            },
            error => {
            dispatch(failed(error));
            }
        )
    }


};

const success = message => ({ type: userConstant.REGISTRATION_SUCCESS, message });
const failed = error => ({ type: userConstant.REGISTRATION_FAILED, error});

const login = (email, password) => {
    return dispatch => {
        
        user_login(email, password)
        .then(response => {
            const {token, user} = response;
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_token', token);
            
            dispatch(success_log(response));
            console.log(response);
            history.push("/profile");
        }, error => {
            console.log(error);
            dispatch(failed_log(error));

        })
    }
}

const success_log = message => ({ type: userConstant.LOGIN_SUCCESS, message });
const failed_log = error => ({ type: userConstant.LOGIN_FAILED, error});

const getProfile = () => {
    
    return dispatch => {
        profile().then(message => {
            dispatch(authenticate_success("You can now access your profile"));
        },
        error => {
            dispatch(authenticate_failed("Unauthorized"));
        })   
    }
}

const authenticate_success = message => ({type: alertConstant.SUCCESS, message });
const authenticate_failed = error => ({type: alertConstant.ERROR, error});

export const userAction = {
    registration,
    login,
    getProfile
}


