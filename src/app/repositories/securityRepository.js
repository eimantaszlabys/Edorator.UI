import axios from 'axios';

function Login(username, password){
    return axios.post('http://localhost:5001/api/accounts/login',
            {
                "Email": username,
                "Password": password
            },
            {
            headers: {
                "Content-Type": "application/json"
            }
        });
}

function Logout(auth){
    return axios.post('http://localhost:5001/api/accounts/logout',
    null,
    {
        "Content-Type": "application/json",
        "Authorization": auth
    })
}

export default {
    Login,
    Logout
};