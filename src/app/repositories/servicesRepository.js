import axios from 'axios';

function AddService(token, name, address){
    const AuthStr = 'Bearer '.concat(token);
    
    var data = { 'name': name, 'address': address };
    var config = { 
            withCredentials: true,
            headers: {
                'Authorization': AuthStr,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

    return axios.post('http://localhost:5002/api/services', data, config);
}

function LoadServices(token){
    const AuthStr = 'Bearer '.concat(token);
    
    var config = { 
            withCredentials: true,
            headers: {
                'Authorization': AuthStr,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

    return axios.get('http://localhost:5002/api/services', config);
}

export default {
    AddService,
    LoadServices
}