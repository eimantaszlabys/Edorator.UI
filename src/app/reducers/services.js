const defaultState = {
    errorMessage: '',
    services: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
    case 'ADD_SERVICE_ERROR':{
        return Object.assign({}, state), {
            errorMessage: action.errorMessage
        };
    }
    case 'LOAD_SERVICES_ERROR':{
        return Object.assign({}, state), {
            errorMessage: action.errorMessage,
            services: []
        };
    }
    case 'ADD_SERVICE_SUCCESS': {
        return Object.assign({}, state), {
            errorMessage: null
        };
    }
    case 'LOAD_SERVICES_SUCCESS': {
        return Object.assign({}, state), {
            errorMessage: null,
            services: action.data
        };
    }
    case 'UPDATE_SERVICE_STATUS_BEGIN':{
        return {
            ...state,
            isLoading: true
        };
    }
    case 'UPDATE_SERVICE_STATUS_SUCCESS':{
        return {
            ...state,
            isLoading: false
        };
    }
    default: 
        return state;
    }
}