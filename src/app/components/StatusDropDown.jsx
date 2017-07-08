import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MenuItem, DropdownButton } from 'react-bootstrap';
import { updateServiceStatus } from '../actions/services';

var options = [{
    label: 'Activate',
    activeLabel: 'Activated',
    status: 'active',
    bsClass: 'success'
},
{
    label: 'Disable',
    activeLabel: 'Disabled',
    status: 'disabled',
    bsClass: 'danger'
}];

class StatusDropDown extends Component {
    constructor(props){
        super(props);

        this.state = {
            selected: ''
        };

        this.getStyle = this.getStyle.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillMount() {

        var selected = this.getSelectedFromProps(this.props);
        this.setState({
            selected: selected.status
        });
    }
    
    componentWillReceiveProps(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);

        this.setState({
            selected: selected.status
        });
    }

    getSelectedFromProps(props){
        return options.find((item) => { 
            return item.status.toLowerCase() == props.selectedStatus.toLowerCase();
        });
    }
    handleOnChange(value){
        if(value === this.state.selected)
            return;

        if(this.props.onChange){
            var change = {
                id: this.props.id,
                oldValue: this.state.selected,
                newValue: value
            };
            this.props.onChange(change);
        }
        
        this.props.updateServiceStatus(this.props.id, value);

        this.setState({ 
            selected: value
        });
    }

    getTitle(){
        var element = options.find((item) => { 
            return item.status.toLowerCase() == this.state.selected.toLowerCase();
        });

        return element.activeLabel;
    }

    getStyle(){
        var element = options.find((item) => { 
            return item.status.toLowerCase() == this.state.selected.toLowerCase();
        });

        return element.bsClass;
    }

    render(){
        var items = options.map((option) => {
            return (
                <MenuItem key={option.status} eventKey={option.status}>
                    {option.label}
                </MenuItem>
            );
        });

        return (
            <DropdownButton 
                disabled={this.props.isLoading}
                bsStyle={this.getStyle()}
                id={this.props.id}
                title={this.props.isLoading ? 'Loading...' : this.getTitle()}
                onSelect={!this.props.isLoading ? this.handleOnChange : null}
            >
                {items}
            </DropdownButton>);
    }
}

StatusDropDown.propTypes  ={
    onChange: PropTypes.func,
    selectedStatus: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.services.errorMessage,
        isLoading: state.services.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateServiceStatus: (key, status) => { dispatch(updateServiceStatus(key, status)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropDown);