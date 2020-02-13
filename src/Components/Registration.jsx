import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { Container, Paper, FormControl } from "@material-ui/core";
import Controller from '../Controller/UserController';
import TextField from "@material-ui/core/TextField";
import "./User.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Passwordagain: "",
      error: false,
      message: ""
    };
  }


  onLogin = () => {

  }

  onchangeUsername = event => {
    this.setState({ Username: event.target.value });
  };

  onchangeEmail = event => {
    this.setState({ Email: event.target.value });
    let emailchng = this.state.Email.match(
      "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}"
    );
  };

  onchangeFirstname = event => {
    if (event.target.value != "" && (event.target.value))
      this.setState({ Firstname: event.target.value });

  };

  onchangeLastname = event => {
    this.setState({ Lastname: event.target.value });

  };

  onchangePassword = event => {
    this.setState({ Password: event.target.value });
  };

  onchangePasswordagain = event => {
    this.setState({ Passwordagain: event.target.value });
  };

  onSubmit = () => {
    var registrationDetails = {

      username: this.state.Username,
      firstname: this.state.Firstname,
      lastname: this.state.Lastname,
      email: this.state.Email,
      password: this.state.Password,
      passwordagain: this.state.Passwordagain

    }
    console.log(registrationDetails)
    Controller.register(registrationDetails).then((res) => {
      console.log(res.data.token)
      if (res.status === 200) {
        this.props.history.push("/login")
        this.setState({
          error: true,
          message: 'Registration success'
        })
      }
      else {
        this.setState({
          error: true,
          message: 'Please Reregister'
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  };


  render() {
    const classes = { useStyles };

    return (
      <div className="main" >
        <Container maxWidth="sm">
          <form className="Register" style={{ width: "50%" }} >
            <h3 className="fundoohead">fundoonotes</h3>
            <div className="row" style={{ width: "300%" }}>
              <div className="col s6 Reg-Username" >

                <TextField
                  required={true}
                  error={this.state.error}
                  id="Username"
                  label="Username"
                  variant="outlined"
                  value={this.state.Username}
                  onChange={this.onchangeUsername}
                  className={classes.paper}
                />
              </div>
              <div className="col s6 Reg-Firstname">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Firstname"
                  label="Firstname"
                  variant="outlined"
                  value={this.state.Firstname}
                  onChange={this.onchangeFirstname}
                  className={classes.paper}
                />
              </div>
            </div>
            <div className="row" style={{ width: "300%" }}>

              <div className="col s6 Reg-Lastname">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Lastname"
                  label="Lastname"
                  variant="outlined"
                  value={this.state.Lastname}
                  onChange={this.onchangeLastname}
                  className={classes.paper}
                />
              </div>
              <div className="col s6 Reg-Email">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Email"
                  label="Email"
                  variant="outlined"
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                />
              </div>
            </div>
            <div className="row" style={{ width: "300%" }}>

              <div className="col s6 Reg-Password">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={this.state.Password}
                  onChange={this.onchangePassword}
                  className={classes.paper}
                />
              </div>
              <div className="col s6 Reg-Passwordagain" >
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Passwordagain"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={this.state.Passwordagain}
                  onChange={this.onchangePasswordagain}
                  className={classes.paper}
                />
              </div>
            </div>
            <div className="row" style={{ width: "300%" }}>

              <div className="col s6 Reg-button">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.paper}
                  style={{ color: "blue" }}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="col s6 Reg-button">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.paper}
                  style={{ color: "blue" }}
                  onClick={this.onLogin}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

export default Registration;
