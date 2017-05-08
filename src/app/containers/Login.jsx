import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: '',
            registerName: '',
            registerPassword: '',
            registerEmail: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleLogin() {
        axios.post('http://localhost:5001/api/accounts/login',
        {
            "Email": this.state.loginEmail,
            "Password": this.state.loginPassword
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            console.log('login',response);
            cookies.set('edoratorAccessToken', response.data.accessToken, {
                expires: new Date(Date.now + response.data.expiresIn)
            });

            <Redirect to="/"/>
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    handleCreateAccount() {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    }

    handleCreate() {
        axios.post('http://localhost:5001/api/accounts/register',
            {
                "Email": this.state.registerEmail,
                "Password": this.state.registerPassword,
                "Name": this.state.registerName
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
            <Redirect to="/login"/>
        })
        .catch((error) => {
            throw Error(error);
        });
    }

    render(){
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input name="registerName" type="text" onChange={this.handleChange} placeholder="name"/>
                        <input name="registerPassword" type="password" onChange={this.handleChange} placeholder="password"/>
                        <input name="registerEmail" type="email" onChange={this.handleChange} placeholder="email address"/>
                        <button onClick={this.handleCreate}>create</button>
                        <p className="message">Already registered? <a href="#" onClick={this.handleCreateAccount}>Sign In</a></p>
                    </form>
                    <form className="login-form">
                        <input name="loginEmail" value={this.props.loginEmail} type="email" placeholder="Email"/>
                        <input name="loginPassword" value={this.props.loginPassword} type="password" placeholder="Password"/>
                        <button onClick={this.handleLogin}>login</button>
                        <p className="message">Not registered? <a href="#" onClick={this.handleCreateAccount}>Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;