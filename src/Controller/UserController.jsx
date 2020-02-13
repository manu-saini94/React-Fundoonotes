import axios from 'axios';


//require('dotenv').config()

let headers = {
    'Content-Type': 'application/json',
    'token': localStorage.getItem('logintoken')
}


var controller = {

    register(registrationDetails) {
        console.log("controller register method ", registrationDetails)
        return axios.post('http://localhost:8080/user/register', registrationDetails)
    }



}

export default controller