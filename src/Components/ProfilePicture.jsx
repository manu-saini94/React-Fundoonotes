import React from "react";
import UserController from "../Controller/UserController";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";

class ProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFormSubmit = async () => {
    console.log("file is:", this.state.file);
    await this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    });
  };
  onChange = async (e) => {
    await this.setState({ file: e.target.files[0] });
    console.log("prof val is:", this.state.file);
  };
  fileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    UserController.addprofilepic(formData).then((res) => {
      if (res.status === 200) {
        console.log("profile pic is added");
        let profilepic = res.data.object;
        localStorage.setItem("profilepicture", profilepic);
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ProfilePicture;
