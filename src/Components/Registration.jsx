import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Controller from '../Controller/UserController';
import TextField from "@material-ui/core/TextField";
import "./User.css";
import Box from '@material-ui/core/Box';


const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 2,
  style: { width: '50rem', height: '35rem', margin: '85px' },
};

const useStyles = makeStyles(theme => ({

  root: {

  },

  paper: {
    padding: theme.spacing(1),
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

  loginPage = () => {
    this.props.history.push('/login')
  }



  onchangeUsername = event => {
    this.setState({ Username: event.target.value });
  };

  onchangeEmail = async event => {
    let emailData = event.target.value
    await this.setState({ Email: emailData });
    console.log("email validation state", this.state.Email);

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.Email)) {
      console.log("email");

    }
    else {
      console.log("not email");


    }
    // let emailchng = await emailData.test("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}");
    // console.log("email validation", emailchng);

  };

  onchangeFirstname = event => {
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
      console.log("hiii...", res)
      if (res.status === 200) {
        alert("Verification link is sent")
        this.props.history.push("/login")
        console.log(res)
        let token = res.data.object
        console.log(token)
        localStorage.setItem("registerToken", token)
        this.setState({
          error: true,
          message: 'Registration success'
        })
      }
      // else {
      //   this.setState({
      //     error: true,
      //     message: 'Please Reregister'
      //   })
      // }
    })
  }



  render() {
    const classes = { useStyles };

    return (
      <div style={{ paddingRight: '50%', marginLeft: '180px' }}>

        <Box display="flex" justifyContent="center" borderColor="text.primary" {...defaultProps} >
          
          <div style={{ marginRight: '15%', paddingRight: '20%', marginTop: '10%' }}>
            <div style={{paddingBottom:'10%'}}>
              <div style={{marginTop:'20%'  }}>
                {/* <div style={{ paddingTop: '10%', marginBottom: '5%', paddingLeft: '-90%', marginTop: '-5%', paddingRight: '90%' }}>
                
                </div> */}
                <div style={{ color: '#616161',fontSize:'35px',marginTop:'-50%',marginBottom:'12%',fontWeight:'lighter'}}>
                  <img style={{ paddingTop: '15%'}} width='60px' height='60px' src={"https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"} alt="Logo" />
                  fundoo
                </div>
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
              <div style={{paddingLeft:'10%', paddingRight:'10%',marginLeft:'50%',marginRight:'-200%',marginTop:'9%'}}>
                <div style={{ color: '#c62828', fontSize: '25px', marginTop: '-26%', fontWeight: '50px',marginBottom: '6%' }}>
                  Registration
                </div>
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
<div>
            <div>
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
              <div style={{ paddingLeft: '10%', paddingRight: '10%', marginLeft: '50%', marginRight: '-200%', marginTop: '-24.1%' }}>
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
            <div>
            <div>
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
              <div style={{ paddingLeft: '10%', paddingRight: '10%', marginLeft: '50%', marginRight: '-200%', marginTop: '9%' }}>
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
            <div>
            <div>
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
              <div style={{ paddingLeft: '10%', paddingRight: '10%', marginLeft: '50%', marginRight: '-200%', marginTop: '2%' }}>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                className={classes.paper}
                style={{ color: "blue" }}
                onClick={this.loginPage}
              >
                signin
  
                </Button>
            </div>
            </div>
          </div>
        </Box>


      </div>

    );
  }
}

export default Registration;
