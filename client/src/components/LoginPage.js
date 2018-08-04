import React, {Component} from 'react';
import {userAction} from '../action/user_action';
import {connect} from 'react-redux';


const mapDispatchToProps = dispatch => {
    return{
        login: (email, password) => (dispatch(userAction.login(email, password)))
    }
}

const mapStateToProps = state => {
    return{
        message: state.login
    }
}

class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            user: {
                email: '',
                password: ''
            },
            
            isAuthenticated: false,
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const { user } = this.state;

        if (user.email && user.password){
            this.props.login(user.email, user.password);
        }

    }
    
    handleChange(e){
        const {user} = this.state;
        const {id, value} = e.target;

        this.setState({ user: {
            ...user, [id] : value
        }})
        
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({message: nextProps.message, isAuthenticated: nextProps.isAuthenticated})
    }
    
    render(){
        const {user} = this.state;
        const {message} = this.state;
        console.log(message);
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                        
                        </div>
                        <div className="col-md-6">
                            <form role="form" onSubmit = {this.handleSubmit}>
                                <div className="form-group">
                                    
                                    <label htmlFor="email">
                                        Email address
                                    </label>
                                    <input type="email" className="form-control" id="email" value = {user.email} onChange = {this.handleChange} />
                                </div>
                                <div className="form-group">
                                    
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input type="password" className="form-control" id="password" value = {user.password} onChange = {this.handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

