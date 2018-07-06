import {combineReducers} from 'redux';
import {registration} from '../reducers/registration.reducer';
import {login} from '../reducers/login.reducers';


const rootReducers = combineReducers({
    registration,
    login
})

export default rootReducers;


