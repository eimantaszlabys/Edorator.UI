
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const defaultState = {
    isLoggedIn: cookies.get('edoratorAuth'),
    errorMessage: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            return Object.assign({}, state, { 
                isLoggedIn: true
            });
        case 'LOGIN_ERROR':{
            return Object.assign({}, state), {
                isLoggedIn: false,
                errorMessage: action.errorMessage
            }
        }
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false
            });
        default:
            return state;
    }
}