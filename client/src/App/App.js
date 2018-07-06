import React, {Component} from 'react';
import { Router, Route } from 'react-router';
import {LoginPage} from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage';
import {history} from '../helpers/history';

export class App extends Component{
    render(){
        return(
            
            <Router history = {history}>
                <div>
                    <Route path = '/register' component = {RegisterPage}/>
                    <Route path = '/sign-in' component = {LoginPage}/>
                </div>
            </Router>
     
        )
    }
}

