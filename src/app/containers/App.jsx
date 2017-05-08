import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import { Router } from 'react-router';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

import Login from './Login';
import Home from './Home';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} component={Login} path="/login"/>
                    <Route component={Home} path="/"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;