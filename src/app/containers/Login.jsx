import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import axios from 'axios';

import { login, register } from '../actions';

import $ from 'jquery';

import LoginForm from '../components/LoginForm'; 

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

let Login = ({dispatch}) => {
let loginEmail;
let loginPassword;
let errorMessage;

function handleChange(event){
    $('#loginalert').hide();
    if(!event.target.value.trim()){
        errorMessage =  "Error: Email or password cannot be empty"
        
        $('#loginalert').show();
    } else if(event.target.name == 'loginPassword'){
        loginPassword = event.target.value;
    } else if(event.target.name == 'loginEmail'){
        if(!validEmail(event.target.value)){
            errorMessage =  "Error: Bad Email or Password"
            $('#loginalert').show();
        }

        loginEmail = event.target.value;
    }
}

function validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

function handleSignUp() {
        $('#loginbox').hide(); 
        $('#signupbox').show();
    }

function handleSignIn() {
        $('#signupbox').hide();
        $('#loginbox').show();
    }

return (
        <div className="container">
            <div id="loginbox" style={{marginTop: '50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"> 
                <LoginForm 
                    onChange={handleChange}
                    onLoginClick={e => {
                        e.preventDefault()
                        if(!validEmail(loginEmail)){
                            errorMessage =  "Error: Bad Email or Password"
                            $('#loginalert').show();
                            return;
                        }

                        dispatch(login(loginEmail, loginPassword))
                    }}
                    onSignUpClick={handleSignUp}
                    errorMessage={errorMessage}
                />
            </div>
            <div id="signupbox" style={{display: 'none', marginTop: '50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                        <div className="panel-title">Sign Up</div>
                        <div style={{float: 'right', fontSize: '85%', position: 'relative', top: '-10px'}}><a id="signinlink" href="#" onClick={this.handleSignIn}>Sign In</a></div>
                    </div> 
                    <div className="panel-body" >
                        <form id="signupform" className="form-horizontal" role="form">
                            <div id="signupalert" style={{display: 'none'}} className="alert alert-danger">
                                <p>Error:</p>
                                <span></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="firstname" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="lastname" placeholder="Last Name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                    <input type="password" className="form-control" name="passwd" placeholder="Password" />
                                </div>
                            </div>
                            <div className="form-group">                                     
                                <div className="col-md-offset-3 col-md-9">
                                    <button id="btn-signup" type="button" className="btn btn-info"><i className="icon-hand-right"></i>Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
            </div>
        </div>
    )
}

Login = connect()(Login);

export default Login;

class Login2 extends Component{

    constructor(props){
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            registerName: '',
            registerPassword: '',
            registerEmail: '',
            errorMessage: ''
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleChange(event) {
        $('#loginalert').hide();

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    handleLogin() {
        var me = this;

        if(this.validateEmail(this.state.loginEmail)){
            axios.post('http://localhost:5001/api/accounts/login',
            {
                "Email": this.state.loginEmail,
                "Password": this.state.loginPassword
            },
            {
            headers: {
                "Content-Type": "application/json"
            }
            }).then(function(response){
                $('#loginalert').hide();

                cookies.set('edoratorAuthTicket', response.data.accessToken);

                <Redirect to={'/home'} />
            }).catch(function(error){
                me.setState({
                    errorMessage: error.toString()
                })
                $('#loginalert').show();
            });
        }else{
            this.setState({
                errorMessage: "Error: Bad email or password"
            })
            $('#loginalert').show();
        }
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
    
    handleSignUp() {
        $('#loginbox').hide(); 
        $('#signupbox').show();
    }

    handleSignIn() {
        $('#signupbox').hide();
        $('#loginbox').show();
    }

    render(){
        return (
            <div className="container">
                 <div id="loginbox" style={{marginTop: '50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"> 
                     <LoginForm 
                        loginEmail = {this.state.loginEmail }
                        loginPassword = {this.state.loginPassword }
                        onChange={this.handleChange}
                        onLoginClick={this.handleLogin}
                        onSignUpClick={this.handleSignUp}
                        errorMessage={this.state.errorMessage}
                      />
                </div>
                <div id="signupbox" style={{display: 'none', marginTop: '50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                     <div className="panel panel-info">
                         <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div style={{float: 'right', fontSize: '85%', position: 'relative', top: '-10px'}}><a id="signinlink" href="#" onClick={this.handleSignIn}>Sign In</a></div>
                        </div> 
                        <div className="panel-body" >
                            <form id="signupform" className="form-horizontal" role="form">
                                <div id="signupalert" style={{display: 'none'}} className="alert alert-danger">
                                    <p>Error:</p>
                                    <span></span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="firstname" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="lastname" placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input type="password" className="form-control" name="passwd" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group">                                     
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="button" className="btn btn-info"><i className="icon-hand-right"></i>Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}
