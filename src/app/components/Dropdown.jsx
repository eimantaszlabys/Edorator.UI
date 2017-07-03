import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem, DropdownButton } from 'react-bootstrap';

class DropDown extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: null,
            valueField: 'value',
            labelField: 'label',
            onChange: null,
            selected: this.getSelectedFromProps(this.props),
            status: this.getStatusFromProps(this.props)
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        var status = this.getStatusFromProps(nextProps);
        this.setState({
            selected: selected,
            status: status
        });
    }

    getStatusFromProps(props){
        var status;
        if(props.options.length !== 0){
            status = props.options[0]['status'];
        } else {
            status = 'default';
        }
        return status;
    }

    getSelectedFromProps(props){
        var selected;
        if(props.options.length !== 0){
            selected = props.options[0][props.labelField];
        } else {
            selected = props.value;
        }
        return selected;
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
            selected: value,
            status: this.getStatusFromProps(this.props)
        });
    }

    render() {
        var options = this.props.options.map((option) => {
            return(
                <MenuItem 
                    key={option[this.props.valueField]}
                    eventKey={option[this.props.labelField]}
                >
                    {option[this.props.valueField]}
                </MenuItem>
            );
        });

        return (
            <DropdownButton 
                bsStyle={this.state.status}
                id={this.props.id}
                title={this.state.selected}
                onSelect={this.handleOnChange}
            >
                {options}
            </DropdownButton>
        );
    }
}

DropDown.propTypes  ={
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType(
        [
            PropTypes.number,
            PropTypes.string
        ]
    ),
    valueField: PropTypes.string,
    labelField: PropTypes.string,
    onChange: PropTypes.func
};

export default DropDown;