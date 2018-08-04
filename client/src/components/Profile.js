import React, {Component} from 'react';
import {userAction} from '../action/user_action';
import {history} from '../helpers/history';


export class Profile extends Component{
    constructor(){
        super();

        this.state = {
            isAuthenticated : false
        }
        
        this.deleteToken = this.deleteToken.bind(this);
    }

    deleteToken(){
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_id');
        history.push('sign-in');
    }

    render(){
        return(
            <div>
                <div>Hi!</div>
                <Logout deleteToken = {this.deleteToken}/>
            </div>
        );
    }
}

const Logout = props => {
    return <div>
                <button type="submit" onClick = {props.deleteToken} className="btn btn-primary">
                    Logout
                </button>
            </div>
}