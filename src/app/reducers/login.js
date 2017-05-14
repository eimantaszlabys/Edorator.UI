const login = (state = {}, action) => {
    switch(action.type) {
        case 'SUCCESS':
            return {
                ...state,
                accessToken: action.accessToken
            }
        case 'ERROR': {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state;
    }
}

export default login;