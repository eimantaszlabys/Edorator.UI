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
    };

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
    };

    return axios.get('http://localhost:5002/api/services', config);
}

function UpdateStatus(token, key, status){
    const AuthStr = 'Bearer '.concat(token);

    var data = { 'key': key, 'status': status };

    var config = { 
        withCredentials: true,
        headers: {
            'Authorization': AuthStr,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    return axios.put('http://localhost:5002/api/services',data, config);
}

export default {
    AddService,
    LoadServices,
    UpdateStatus
};