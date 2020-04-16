import axios from "axios";

// let header = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'jwt': localStorage.getItem('logintoken')
// }
const header = {
  Authorization: "Bearer " + localStorage.getItem("logintoken")
};
const token = localStorage.getItem("logintoken");
var controller = {
  pinnote(id) {
    return axios.put(`http://localhost:8080/note/update/pin/${id}`, null, {
      headers: { jwt: token, "Content-type": "application/json " }
    });
  },

  archivenote(id) {
    return axios.put(`http://localhost:8080/note/update/archive/${id}`, null, {
      headers: { jwt: token, "Content-type": "application/json " }
    });
  },

  colornote(id, color) {
    return axios.put(`http://localhost:8080/note/update/color/${id}`, null, {
      headers: { jwt: token, "Content-type": "application/json ", color: color }
    });
  },
  setTitleDesc(noteDetails) {
    return axios.put(
      `http://localhost:8080/note/update/title&takeanote/${noteDetails.id}`,
      noteDetails,
      { headers: { jwt: token, "Content-type": "application/json " } }
    );
  },
  deletenote(id) {
    return axios.put(`http://localhost:8080/note/delete/${id}`, null, {
      headers: { jwt: token, "Content-type": "application/json " }
    });
  },

  restorenote(id) {
    return axios.put(`http://localhost:8080/note/restore/${token}`, null, {
      headers: { id: id, "Content-type": "application/json " }
    });
  },
  deletenoteforever(id) {
    return axios.put(
      `http://localhost:8080/note/deleteforever/${token}`,
      null,
      { headers: { id: id, "Content-type": "application/json " } }
    );
  },
  emptytrash() {
    return axios.put(`http://localhost:8080/note/emptytrash/${token}`, null, {
      headers: { "Content-type": "application/json " }
    });
  },
  addlabeltonote(noteDetails, id) {
    return axios.put(
      `http://localhost:8080/note/update/label/${id}`,
      noteDetails,
      { headers: { jwt: token, "Content-type": "application/json " } }
    );
  },
  deletelabelfornote(id, id1) {
    return axios.delete(`http://localhost:8080/note/delete/label/${id}`, {
      headers: { id1: id1, jwt: token, "Content-type": "application/json " }
    });
  },
  addcollabtonote(collabDetails) {
    return axios.post("http://localhost:8080/collab/add", collabDetails, {
      headers: { jwt: token, "Content-type": "application/json " }
    });
  },
  deletecollabfromnote(collabDetails) {
    return axios.post("http://localhost:8080/collab/delete", collabDetails, {
      headers: { jwt: token, "Content-type": "application/json " }
    });
  },
  updatenote(noteDetails) {
    return axios.put(
      "http://localhost:8080/note/updateAll/" + token,
      noteDetails
    );
  }
};
export default controller;
