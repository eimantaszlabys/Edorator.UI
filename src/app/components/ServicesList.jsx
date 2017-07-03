import React from 'react';
import PropTypes from 'prop-types';

import StatusDropDown from '../components/StatusDropDown';

class ServicesList extends React.Component {
    constructor(props){
        super(props);

        this.dropDownOnChange = this.dropDownOnChange.bind(this);
    }

    dropDownOnChange(value){
        console.log('dropdownValue', value);
    }
    
    render(){
        if(!this.props.data){
            return <div>Loading...</div>;
        }

        let rows = [];

        this.props.data.forEach(function(item) {
            var elementKey = item.address + item.name;
            var element = 
                <tr key={elementKey}>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                        <StatusDropDown
                            id={elementKey}
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

export default ServicesList;
