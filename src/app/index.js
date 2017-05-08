import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 


import './styles/bundle.scss';

import Login from './containers/Login';
import Home from './containers/Home';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact={true} component={Login} path="/"/>
            <Route component={Home} path="/home"/>
        </Switch>
    </Router>,
    document.getElementById('root')
);