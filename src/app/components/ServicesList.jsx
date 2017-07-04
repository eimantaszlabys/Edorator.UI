import React from 'react';
import PropTypes from 'prop-types';

import StatusDropDown from '../components/StatusDropDown';

class ServicesList extends React.Component {
    constructor(props){
        super(props);
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

export default ServicesList;
