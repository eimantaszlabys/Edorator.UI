import React, { PropTypes, Component } from 'react';
import { instanceOf } from 'prop-types';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

class Home extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        const { cookies } = this.props;
        console.log(cookies);
    
        // console.log(cookies.get('.AspNetCore.Identity.Application'));
    }

    render() {
        return(
            <div>aaa</div>
        );
    }
}

export default Home;