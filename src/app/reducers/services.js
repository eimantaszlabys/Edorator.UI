const defaultState = {
    errorMessage: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_SERVICE_ERROR':{
            return Object.assign({}, state), {
                errorMessage: action.errorMessage
            }
        }
        default: 
            return state;
    }};