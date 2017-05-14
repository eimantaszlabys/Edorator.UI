import security from '../repositories/securityRepository';

export const login = (email, password) => {
    return (dispatch) => {
        return security.Login(email, password)
            .then((response) => {
                dispatch({ type: 'SUCCESS', accessToken: response.accessToken})
            })
            .catch(error => { 
                dispatch({ type: 'ERROR', message: error.message })
            })
    }
}