import axios from "axios";
import Forgotpassword from "../Components/Forgotpassword";

//require('dotenv').config()

let jwt = localStorage.getItem("logintoken");

const token = localStorage.getItem("logintoken");
var controller = {
  register(registrationDetails) {
    console.log("controller register method ", registrationDetails);
    return axios.post(
      "http://localhost:8080/user/register",
      registrationDetails
    );
  },
  login(loginDetails) {
    console.log("controller login method ", loginDetails);
    return axios.post("http://localhost:8080/user/login", loginDetails);
  },
  forgotpassword(forgotDetails) {
    console.log("controller forgotpassword method ", forgotDetails);
    return axios.post(
      "http://localhost:8080/user/forgotpassword",
      forgotDetails
    );
  },
  resetpassword(resetDetails, jwt) {
    console.log("controller `resetpassword method ", resetDetails);
    console.log(jwt);
    return axios.put(
      `http://localhost:8080/user/resetpassword/${jwt}`,
      resetDetails
    );
  },
  verification(jwt) {
    console.log("controller `verification method ");
    console.log(jwt);
    return axios.put(`http://localhost:8080/user/verifyemail/${jwt}`);
  },
  takenote(noteDetails) {
    return axios.post(
      "http://localhost:8080/note/create/" + token,
      noteDetails
    );
  },
  async getNotes() {
    let datas = [];
    await axios
      .get("http://localhost:8080/note/displayAll/" + token)
      .then((res) => {
        console.log(res.data, "kjlk");
        res.data.object.forEach((element) => {
          datas.push(element);
        });
      });
    return datas;
  },

  addprofilepic(formData) {
    return axios.post("http://localhost:8080/user/files/add", formData, {
      headers: {
        "content-type": "multipart/form-data",
        enablePublicReadAccess: true,
      },
    });
  },
};

export default controller;
