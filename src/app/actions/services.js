import services from '../repositories/servicesRepository';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const addService = (name, address) => {
    return (dispatch) => {
        return services.AddService(cookies.get('edoratorAuth'), name, address)
            .then((response) => {
                dispatch({ type: 'ADD_SERVICE_SUCCESS', data: response.data })
            })
            .catch(error => { 
                dispatch({ type: 'ADD_SERVICE_ERROR', errorMessage: error.message })
            })
    }
};