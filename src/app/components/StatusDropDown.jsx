import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem, DropdownButton } from 'react-bootstrap';

var options = [{
    label: 'Activate',
    activeLabel: 'Activated',
    status: 'active',
    bsClass: 'success'
},
{
    label: 'Disable',
    activeLabel: 'Disabled',
    status: 'error',
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
                <MenuItem
                    key={option.status} 
                    eventKey={option.status}
                >
                    {option.label}
                </MenuItem>
            );
        });

        return (
            <DropdownButton 
                bsStyle={this.getStyle()}
                id={this.props.id}
                title={this.getTitle()}
                onSelect={this.handleOnChange}
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

export default StatusDropDown;