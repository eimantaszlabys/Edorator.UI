import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { Modal, Button } from 'react-bootstrap';
import Menu from '../components/Menu';
import AddService from '../components/AddService';
import ServicesList from '../components/ServicesList';

class Home extends Component {
     constructor (props) {
        super(props);
        this.state = {
            services: [],
            showAddServiceModal: false
        };
    }

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    closeAddServiceModal() {
        this.setState({ showAddServiceModal: false });
    }   

    addNewService() {
        this.setState({ showAddServiceModal: true });
    }
    
    render() {
        return (
            <div>
                <Menu logOutClick={(e) => this.userLogout(e)}/>
                <ServicesList 
                    servicesList={this.state.services}
                    addService={() => this.addNewService()}
                />  

                { this.state.showAddServiceModal ? <AddService /> : ''}
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
