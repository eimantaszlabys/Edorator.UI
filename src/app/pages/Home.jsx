import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import Menu from '../components/Menu';
import ServicesList from '../components/ServicesList';
import AddService from '../components/AddService';

import { loadServices } from '../actions/services';

import { Alert } from 'react-bootstrap';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentWillMount() {
        this.props.loadServices();
    }

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    render() {
        if(!this.props.services){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Menu logOutClick={(e) => this.userLogout(e)}/>
                { this.props.errorMessage ?  <Alert bsStyle="danger"> 
                                <strong>Error!</strong> {this.props.errorMessage}
                            </Alert> : '' }

                <div>
                    <button type="button" className="btn btn-primary" onClick={() => {this.setState({showModal: true});}}>Add Service</button>
                </div>

                <div>
                    <ServicesList data={this.props.services} />  
                </div>

                <AddService showModal={this.state.showModal}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        errorMessage: state.services.errorMessage,
        services: state.services.services
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); },
        loadServices: () => { dispatch(loadServices()); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
