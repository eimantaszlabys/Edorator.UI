import React from 'react';
import PropTypes from 'prop-types';

const ServicesList = ({addService, servicesList}) => (
    <div>
        <button type="button" className="btn btn-primary" onClick={addService}>Add Service</button>

        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>IP Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {servicesList.map((x, i) => {
                        i++;
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{x.name}</td>
                                <td>{x.address}</td>
                                <td>{x.status}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

ServicesList.propTypes  ={
    addService: PropTypes.func.isRequired,
    servicesList: PropTypes.array.isRequired
}

export default ServicesList;
