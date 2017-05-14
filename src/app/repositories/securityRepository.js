import axios from 'axios';

function Login(email, password){
    return axios.post('http://localhost:5001/api/accounts/login',
            {
                "Email": email,
                "Password": password
            },
            {
            headers: {
                "Content-Type": "application/json"
            }
        });
}

export default {
    Login
};