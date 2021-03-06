import security from '../repositories/securityRepository';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const login = (username, password) => {
    return (dispatch) => {
        return security.Login(username, password)
            .then((response) => {
                cookies.set('edoratorAuth', response.data.accessToken)
                return response;
            })
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS'});
            })
            .catch(error => { 
                dispatch({ type: 'LOGIN_ERROR', errorMessage: error.message })
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        return security.Logout(cookies.get('edoratorAuth'))
            .then(() => {
                cookies.remove('edoratorAuth');
            }) 
            .then(() => {
                dispatch({type: 'LOGOUT_SUCCESS'});
            })
            .catch(error => { 
                dispatch({ type: 'LOGOUT_ERROR', errorMessage: error.message });
            });
    };
};