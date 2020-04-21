import React from "react";
import UserController from "../Controller/UserController";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";

class ProfilePicture extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      added: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  handleProfilepicRemove = () => {
    var filename = localStorage.getItem("profilepicture");

    UserController.removeprofilepic(filename).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("profilepicture");
        console.log("profile pic is removed");
      }
    });
  };
  onFormSubmit = async () => {
    console.log("file is:", this.state.file);
    this.fileUpload(this.state.file);
  };
  onChange = async (e) => {
    await this.setState({ file: e.target.files[0] });
    this.setState({ added: this.state.file.name });
  };
  fileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    localStorage.setItem("profilepicture", this.state.added);
    await UserController.addprofilepic(formData).then((res) => {
      if (res.status === 200) {
        console.log("profile pic is added");
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <div className="choose-file">
            <input type="file" onChange={this.onChange} />
          </div>
          <div style={{ display: "flex" }}>
            <div className="upload-file">
              <button className="signout-button" type="submit">
                Upload
              </button>
            </div>
            <div className="upload-file">
              <button
                className="signout-button"
                onClick={this.handleProfilepicRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ProfilePicture;
