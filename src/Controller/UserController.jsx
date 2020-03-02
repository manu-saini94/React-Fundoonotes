import axios from 'axios';
import Forgotpassword from '../Components/Forgotpassword';


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
    ,
    login(loginDetails) {
        console.log("controller login method ", loginDetails)
        return axios.post('http://localhost:8080/user/login', loginDetails)
    }
    ,
    forgotpassword(forgotDetails) {
        console.log("controller forgotpassword method ", forgotDetails)
        return axios.post('http://localhost:8080/user/forgotpassword', forgotDetails)
    }
    ,
    resetpassword(resetDetails, jwt) {
        console.log("controller `resetpassword method ", resetDetails)
        console.log(jwt)
        return axios.put(`http://localhost:8080/user/resetpassword/${jwt}`, resetDetails)
    },
    verification(jwt) {
        console.log("controller `verification method ")
        console.log(jwt)
        return axios.put(`http://localhost:8080/user/verifyemail/${jwt}`)
    },
    signout(jwt){

    },
    takenote(noteDetails) {
        console.log("controller `takenote method ", noteDetails)
        console.log("Pin ", noteDetails.pinned)
        console.log("Archive ", noteDetails.archived)
        const token = localStorage.getItem("logintoken")
        console.log("gggggggggg ", token)
        return axios.post("http://localhost:8080/note/create/" + token, noteDetails)

    }

}

export default controller