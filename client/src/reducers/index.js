import {combineReducers} from 'redux';
import {registration} from '../reducers/registration.reducer';
import {login} from '../reducers/login.reducers';
import {profile} from '../reducers/profile.reducers';

const rootReducers = combineReducers({
    registration,
    login,
    profile
})

export default rootReducers;


