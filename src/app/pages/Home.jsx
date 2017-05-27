import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Menu from '../components/home/Menu';

class Home extends Component {
    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }
    
    render() {
        return (
            <div>
                <Menu logOutClick={(e) => this.userLogout(e)}/>
                    
                    {`Welcome ${this.props}`}
                </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        accessToken: state.auth.accessToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
