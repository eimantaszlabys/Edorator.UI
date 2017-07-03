import services from '../repositories/servicesRepository';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const addService = (name, address) => {
    return (dispatch) => {
        return services.AddService(cookies.get('edoratorAuth'), name, address)
            .then((response) => {
                dispatch({ type: 'ADD_SERVICE_SUCCESS', data: response.data });
                dispatch(loadServices());
            })
            .catch(error => { 
                dispatch({ type: 'ADD_SERVICE_ERROR', errorMessage: error.message });
            });
    };
};

export const updateServiceStatus = (key, status) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_SERVICE_STATUS_BEGIN'});

        return services.UpdateStatus(cookies.get('edoratorAuth'), key, status)
            .then(() => {
                dispatch({ type: 'UPDATE_SERVICE_STATUS_SUCCESS' });
            })
            .catch(error => { 
                dispatch({ type: 'UPDATE_SERVICE_STATUS_ERROR', errorMessage: error.message });
            });
    };
};

export const loadServices = () => {
    return (dispatch) => {
        return services.LoadServices(cookies.get('edoratorAuth'))
            .then(response => {
                dispatch({ type: 'LOAD_SERVICES_SUCCESS', data: response.data.items });
            })
            .catch(error => { 
                dispatch({ type: 'LOAD_SERVICES_ERROR', errorMessage: error.message });
            });
    };
};