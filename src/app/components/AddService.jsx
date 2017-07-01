import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Modal, 
    Button,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';

import { addService } from '../actions/services';

class AddService extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            name: '',
            address: '',
            validation: {
                serviceName: null,
                serviceIpAddress: null
            }
        };

        this.closeAddServiceModal = this.closeAddServiceModal.bind(this);
        this.saveAddServiceModal = this.saveAddServiceModal.bind(this);
        this.serviceIpAddressChange = this.serviceIpAddressChange.bind(this);
        this.serviceNameChange = this.serviceNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps){
            this.setState({
                showModal: nextProps.showModal
            });
        }   
    }

    closeAddServiceModal(){
        this.setState({ showModal: false });
    }

    saveAddServiceModal(){
        this.props.addService(this.state.name, this.state.address);
        this.closeAddServiceModal();
    }

    serviceIpAddressChange(value){
        if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)){
            this.setState({
                validation: { 
                    ...this.state.validation,
                    serviceIpAddress: 'success'
                },
                address: value
            });
        }else{
            this.setState({
                validation: {
                    ...this.state.validation,
                    serviceIpAddress: 'error'
                }
            });
        }
    }

    serviceNameChange(value){
        if(value == null || value.length < 2)
        {
            this.setState({
                validation: { 
                    ...this.state.validation,
                    serviceName: 'error' 
                }
            });
        }else{
            this.setState({
                validation: { 
                    ...this.state.validation,
                    serviceName: 'success' 
                },
                name: value
            });
        }
    }

    saveButtonDisabled(){
        return (
            this.state.validation.serviceIpAddress === 'error' ||
            this.state.validation.serviceName === 'error' ||
            this.state.validation.serviceIpAddress === null||
            this.state.validation.serviceName === null);
    }
    
    render() {
        return (<div>
            <Modal show={this.state.showModal} onHide={this.closeAddServiceModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup validationState={this.state.validation.serviceName}>
                                <FormControl 
                                    id="serviceName"
                                    type="text" 
                                    placeholder="Service name"
                                    onChange={(e) => this.serviceNameChange(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup validationState={this.state.validation.serviceIpAddress}>
                                <FormControl 
                                    id="serviceIpAddress"
                                    type="text" 
                                    placeholder="Service IP address"
                                    onChange={(e) => this.serviceIpAddressChange(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            bsStyle="primary" 
                            onClick={this.saveAddServiceModal} 
                            disabled={this.saveButtonDisabled()}
                        >Save</Button>
                        <Button onClick={this.closeAddServiceModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>);
    }
}

AddService.propTypes ={
    showModal: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.services.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addService: (name, address) => { dispatch(addService(name, address)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddService);