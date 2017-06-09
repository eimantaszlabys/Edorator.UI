import React from 'react';
import PropTypes from 'prop-types';

class ServicesList extends React.Component {
    constructor(props){
        super(props);

        this.renderStatus = this.renderStatus.bind(this);
    }

    renderStatus(status){
        var element = <span>{status}</span>
        switch (status) {
            case 'Active':
                element = <span className="label label-success">{status}</span>
                break;
        }

        return element;
    }
    
    render(){
        if(!this.props.data){
            return <div>Loading...</div>
        }

        let rows = [];

        this.props.data.forEach(function(item) {
            var item = 
                <tr key={item.address}>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{this.renderStatus(item.status)}</td>
                </tr>

            rows.push(item);
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
        )

    }
}

ServicesList.propTypes  ={
    data: PropTypes.array.isRequired
}

export default ServicesList;
