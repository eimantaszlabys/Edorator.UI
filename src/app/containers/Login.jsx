import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router-dom'; 
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
                     <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            <div style={{float:'right', fontSize: '80%', position: 'relative', top:'-10px'}}><a href="#">Forgot password?</a></div>
                        </div>   

                        <div style={{paddingTop:'30px'}} className="panel-body">
                            <div style={{display:'none'}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                            
                            <form id="loginform" className="form-horizontal" role="form">
                                <div id="loginalert" style={{display: 'none'}} className="alert alert-danger">
                                    <p>{this.state.errorMessage}</p>
                                    <span></span>
                                </div>

                                <div style={{marginBottom: '25px'}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input id="login-username" type="email" className="form-control" onChange={this.handleChange} name="loginEmail" value={this.state.loginEmail} placeholder="email"/>                                        
                                </div>
                                
                                 <div style={{marginBottom: '25px'}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" className="form-control" onChange={this.handleChange} value={this.state.loginPassword}  name="loginPassword" placeholder="password" />
                                </div>

                                 <div className="input-group">
                                    <div className="checkbox">
                                        <label>
                                            <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                                        </label>
                                    </div>
                                </div>

                                <div style={{marginTop: '10px'}} className="form-group">
                                    <div className="col-sm-12 controls">
                                      <a id="btn-login" onClick={this.handleLogin} className="btn btn-success">Login  </a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{borderTop: '1px solid#888', paddingTop: '15px', fontSize: '85%'}} >
                                            Don't have an account! 
                                        <a href="#" onClick={this.handleSignUp}>
                                            Sign Up Here
                                        </a>
                                        </div>
                                    </div>
                                </div>    
                            </form>     
                        </div>
                    </div>
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

export default Login;