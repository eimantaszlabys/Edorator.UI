import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ 
        onLoginClick,
        onSignUpClick, 
        onChange,
        errorMessage 
    }) => (
    <div className="panel panel-info">
            <div className="panel-heading">
                <div className="panel-title">Sign In</div>
                <div style={{float:'right', fontSize: '80%', position: 'relative', top:'-10px'}}><a href="#">Forgot password?</a></div>
            </div>   

            <div style={{paddingTop:'30px'}} className="panel-body">
                <div style={{display:'none'}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                
                <form id="loginform" className="form-horizontal" role="form">
                    <div id="loginalert" style={{display: 'none'}} className="alert alert-danger">
                        <p>{errorMessage}</p>
                        <span></span>
                    </div>

                    <div style={{marginBottom: '25px'}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input id="login-username" type="email" className="form-control" onChange={onChange} name="loginEmail" placeholder="email"/>                                        
                    </div>
                    
                        <div style={{marginBottom: '25px'}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input id="login-password" type="password" className="form-control" onChange={onChange} name="loginPassword" placeholder="password" />
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
                            <a id="btn-login" onClick={onLoginClick} className="btn btn-success">Login  </a>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 control">
                            <div style={{borderTop: '1px solid#888', paddingTop: '15px', fontSize: '85%'}} >
                                Don't have an account! 
                            <a href="#" onClick={onSignUpClick}>
                                Sign Up Here
                            </a>
                            </div>
                        </div>
                    </div>    
                </form>     
            </div>
        </div>
);

LoginForm.PropTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onSignUpClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
}

export default LoginForm;