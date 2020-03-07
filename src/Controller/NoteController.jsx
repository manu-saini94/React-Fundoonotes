
import axios from 'axios';

// let header = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'jwt': localStorage.getItem('logintoken')
// }
const header = { Authorization: "Bearer " + localStorage.getItem('logintoken') };
const token = localStorage.getItem("logintoken")
var controller = {

    pinnote(id) {
        // let headers = {
        //     jwt: token
        // }
        // console.log(headers, id)
        return axios.put(`http://localhost:8080/note/update/pin/${id}`, null, { headers: { "jwt": token, "Content-type": "application/json " } })
    },

    archivenote(id) {
        return axios.put(`http://localhost:8080/note/update/archive/${id}`, null, { headers: { "jwt": token, "Content-type": "application/json " } })
    },

    colornote(id, color) {
        return axios.put(`http://localhost:8080/note/update/color/${id}`, null, { headers: { "jwt": token, "Content-type": "application/json ", "color": color } })
    },
    setTitleDesc(noteDetails) {
        return axios.put(`http://localhost:8080/note/update/title&takeanote/${noteDetails.id}`, noteDetails, { headers: { "jwt": token, "Content-type": "application/json " } })
    }

}
export default controller