import axios from 'axios';

function AddService(auth, name, address){
    return axios.post('http://localhost:5002/api/services',
            {
                name,
                address
            },
            {
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        });
}

export default {
    AddService
}