import React from 'react';
import PropTypes from 'prop-types';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const ServicesList = ({addService, servicesList}) => (
    <div>
        <button type="button" className="btn btn-primary" onClick={addService}>Add Service</button>

        <BootstrapTable data={servicesList} striped={true} hover={true}>
            <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField="address" dataSort={true}>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>
    </div>
);

ServicesList.propTypes  ={
    addService: PropTypes.func.isRequired,
    servicesList: PropTypes.array.isRequired
}

export default ServicesList;
