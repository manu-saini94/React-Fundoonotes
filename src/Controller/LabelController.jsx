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
  newlabelforuser(labelDetails) {
    return axios.post(
      `http://localhost:8080/label/edit/create/`,
      labelDetails,
      {
        headers: { jwt: token, "Content-type": "application/json " }
      }
    );
  },
  async getLabels() {
    let datas = [];
    await axios
      .get("http://localhost:8080/label/displaylabels/" + token)
      .then(res => {

        res.data.object.forEach(element => {
          datas.push(element);
        });
      });
    return datas;
  },
  editlabelforuser(labelDetails) {

    return axios.put(
      `http://localhost:8080/label/edit/rename/${labelDetails.id}`,
      labelDetails,
      {
        headers: { jwt: token, "Content-type": "application/json " }
      }
    );
  },
  deletelabelforuser(labelDetails) {
    return axios.put(
      `http://localhost:8080/label/edit/delete/${labelDetails.id}`,
      null,
      {
        headers: { jwt: token, "Content-type": "application/json " }
      }
    );
  }

};
export default controller;
