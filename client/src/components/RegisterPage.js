import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAction} from '../action/user_action';



const mapDispatchToProps = dispatch => {
    return{
        registration: user_information => (dispatch(userAction.registration(user_information)))
    }
}

const mapStateToProps = state => {
    return {
       alert : state
    
    }
}

class RegisterForm extends Component{

    constructor(props){
        super(props);

        this.state = {
           user: {
            email: '',
            password: '',
            name: '',
            address: ''
           },
           isSubmitted: false 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){
        const {id, value} = e.target;
        const {user} = this.state;
        this.setState({ user : { ...user, [id] : value  }});
    }

   handleSubmit(e){
      e.preventDefault();
      this.setState({isSubmitted : true})   
    
      const {email, password, name, address} = this.state.user;
      const {user} = this.state;

      if(email && password && name && address){
          this.props.registration({email, password, name, address});
      };
      
      this.setState({ 
        isSubmitted: true
        })   
    }
    render(){
        const {user, isSubmitted} = this.state;
      
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-6">
                                <form method = "post" onSubmit = {this.handleSubmit}>
                                    <div className= {"form-group" + (isSubmitted && !user.email ? 'has-error' : '')} > 
                                        <label htmlFor="email">
                                            Email address
                                        </label>
                                        <input type="email" className="form-control" value = {user.email} onChange = {this.handleChange} id="email" />
                                        {isSubmitted && !user.email &&
                                            <div className = "alert alert-danger"> <strong> Email is required! </strong></div>
                                        }    
                                    </div>
                                    <div className={"form-group" + (isSubmitted && !user.password ? 'has-error' : '')}>
                                        
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input type="password" className="form-control" value = {user.password} onChange = {this.handleChange} id="password" />
                                        {isSubmitted && !user.password &&
                                            <div className = "alert alert-danger"> <strong> Password is a must! </strong></div>
                                        }
                                    </div>
                                    <div className={"form-group" + (isSubmitted && !user.name ? 'has-error' : '')}>
                                        <label htmlFor="name">
                                            Name
                                        </label>
                                        <input type="name" className="form-control" value = {user.name} onChange = {this.handleChange} id="name" />
                                        {isSubmitted && !user.name &&
                                            <div className = "alert alert-danger"> <strong> Name is a must! </strong></div>
                                        }
                                    </div>
                                    <div className={"form-group" + (isSubmitted && !user.address? 'has-error' : '')}>
                                        <label htmlFor="address">
                                            Address
                                        </label>
                                        <input type="address" className="form-control" value = {user.address} onChange = {this.handleChange} id="address" />
                                        {isSubmitted && !user.address &&
                                            <div className = "alert alert-danger"> <strong> Address is a must! </strong></div>
                                        }
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
        );
    }
}

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
