import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { instanceOf } from 'prop-types';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

class Home extends Component {
    constructor(){
        super();

        this.isAnonymous = this.isAnonymous.bind(this);
    }

    isAnonymous(){
        return !cookies.get('edoratorAccessToken');
    }

    render() {
        if (this.isAnonymous()) {
            return (
                <Redirect to={'/login'}/>
            )
        }

        return(
            <div>aaa</div>
        );
    }
}

export default Home;