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
            bsStyle: this.getBsStyleFromProps(this.props)
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
            selected: selected
        });
    }

    getBsStyleFromProps(props){
        var style = 'default';

        if(props.selected){
            switch (props.selected) {
            case 'Activated':
                style = 'success';
                break;
            }
        }
        return style;
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
            bsStyle: this.getBsStyleFromProps(this.props)
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
                bsStyle={this.state.bsStyle}
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