import axios from 'axios';

function Login(username, password){
    return axios.post('http://localhost:5001/api/accounts/login',
        {
            'Email': username,
            'Password': password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

function Logout(token){
    return axios.post('http://localhost:5001/api/accounts/logout',
        null,
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'  + token,
        });
}

export default {
    Login,
    Logout
};