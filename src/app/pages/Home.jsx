import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { Modal, Button } from 'react-bootstrap';
import Menu from '../components/Menu';
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

    openAddServiceModal() {
        this.setState({ showAddServiceModal: true });
    }
    
    render() {
        return (
            <div>
                <Menu logOutClick={(e) => this.userLogout(e)}/>
                <ServicesList 
                    servicesList={this.state.services}
                    addService={this.openAddServiceModal.bind(this)}
                />  

                <Modal show={this.state.showAddServiceModal} onHide={this.closeAddServiceModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <h4>Popover in a modal</h4>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeAddServiceModal.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
