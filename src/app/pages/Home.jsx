import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Menu from '../components/Menu';
import ServicesList from '../components/ServicesList';

class Home extends Component {
     constructor (props) {
        super(props);
        this.state = {
            services: []
        };
    }

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    addService(){
        var list = this.state.services;
        console.log(list);
        list.push({
                name: 'ss',
                address: 'ss',
                status: 's'
            });
        this.setState({
            services: list
        })
    }
    
    render() {
        return (
            <div>
                <Menu logOutClick={(e) => this.userLogout(e)}/>
                <ServicesList 
                    servicesList={this.state.services}
                    addService={() => this.addService()}
                />        
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
