import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StatusDropDown from '../components/StatusDropDown';
import { updateServiceStatus } from '../actions/services';

class ServicesList extends React.Component {
    constructor(props){
        super(props);

        this.dropDownOnChange = this.dropDownOnChange.bind(this);
    }

    dropDownOnChange(value){
        console.log(value);
        this.props.updateServiceStatus(value.id, value.newValue);
    }
    
    render(){
        if(!this.props.data){
            return <div>Loading...</div>;
        }

        let rows = [];

        this.props.data.forEach(function(item) {
            var element = 
                <tr key={item.key}>
                    <td>{item.key}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                        <StatusDropDown
                            id={item.key}
                            selectedStatus={item.status}
                            onChange={this.dropDownOnChange}
                        />
                    </td>
                </tr>;

            rows.push(element);
        }, this);

        return(
            <div>
                <table className="table table-striped">
                    <thead>
                         <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {rows}
                    </tbody>
                </table>
            </div>
        );

    }
}

ServicesList.propTypes  ={
    data: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.services.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateServiceStatus: (key, status) => { dispatch(updateServiceStatus(key, status)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
