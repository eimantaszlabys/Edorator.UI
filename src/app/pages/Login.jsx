import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import $ from 'jquery';


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        $('#loginalert').hide();
        if(nextProps.isLoggedIn === false && nextProps.errorMessage){
            $('#loginalert').show();
        }
    }

    userLogin (e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }

    handleChange(e) {
        var name = e.target.name;

        this.setState({
            [name]: e.target.value
        });
    }

    render() {
        return (
           <div className="panel panel-info">
            <div className="panel-heading">
                <div className="panel-title">Sign In</div>
                <div style={{float:'right', fontSize: '80%', position: 'relative', top:'-10px'}}><a href="#">Forgot password?</a></div>
            </div>   

            <div style={{paddingTop:'30px'}} className="panel-body">
                <div style={{display:'none'}} id="login-alert" className="alert alert-danger col-sm-12" />
                
                <form id="loginform" className="form-horizontal" role="form">
                    <div id="loginalert" style={{display: 'none'}} className="alert alert-danger">
                        <p>{this.props.errorMessage}</p>
                        <span />
                    </div>

                    <div style={{marginBottom: '25px'}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                        <input id="login-username" type="email" className="form-control" onChange={(e) => this.handleChange(e)} name="username" placeholder="email"/>                                        
                    </div>
                    
                        <div style={{marginBottom: '25px'}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                        <input id="login-password" type="password" className="form-control" onChange={(e) => this.handleChange(e)} name="password" placeholder="password" />
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
                            <a id="btn-login" onClick={(e) => this.userLogin(e)} className="btn btn-success">Login  </a>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 control">
                            <div style={{borderTop: '1px solid#888', paddingTop: '15px', fontSize: '85%'}} >
                                Don't have an account! 
                            {/*<a href="#" onClick={onSignUpClick}>
                                Sign Up Here
                            </a>*/}
                            </div>
                        </div>
                    </div>    
                </form>     
            </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);