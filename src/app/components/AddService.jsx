import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Modal, 
    Button,
    Form,
    FormControl,
    FormGroup,
    Alert
} from 'react-bootstrap';

import { addService } from '../actions/services';

class AddService extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            name: '',
            address: ''
        }
    }

    componentWillMount() {
        this.setState({ showModal: true });
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.errorMessage){
            this.close();
        }
    }
    
    close() {
        this.setState({ showModal: false });
    }

    save(e) {
        e.preventDefault();
        this.props.addService(this.state.name.value, this.state.address.value);
    }
    
    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.props.errorMessage ?
                            <Alert bsStyle="danger">
                                <strong>Error!</strong> {this.props.errorMessage}
                            </Alert> : '' 
                        }
                        <Form>
                            <FormGroup>
                                <FormControl 
                                    type="text" 
                                    placeholder="Service name"
                                    inputRef={ref => { this.state.name = ref; }}
                                    />
                            </FormGroup>
                            <FormGroup>
                                <FormControl 
                                type="text" 
                                placeholder="Service IP address"
                                inputRef={ref => { this.state.address = ref; }} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={(e) => this.save(e)}>Save</Button>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

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