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
  style: { width: '49rem', height: '34rem', margin: '85px' },
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
      err1:false,
      err2:false,
      message: ""
    };
  }

  loginPage = () => {
    this.props.history.push('/login')
  }

  helpermailMethod=() => {
   if(this.state.err1)
   {
    return "Not a valid mail id"   
   }
  }

  helperusernameMethod=() =>{
    if (this.state.err2) {
      return "cannot be empty"
    } 
  }

  // helperfirstnameMethod = () => {
  //   if (this.state.err3) {
  //     return "cannot be empty"
  //   }
  // }
  onchangeUsername = async event => {
    await this.setState({ Username: event.target.value });

    if (this.state.Username!==null) {
      this.setState({ err2: false });

    }
    else {
      this.setState({ err2: true });
    }
  };

  onchangeEmail = async event => {
     
    await this.setState({ Email: event.target.value });

    if (/^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(this.state.Email)) {
      this.setState({ err1: false});

    }
    else {
      this.setState({ err1: true });
    }
  
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
          <div style={{ marginTop: '14px',marginLeft: '14px'}}>
            <img width='60px' height='60px' src={"https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"} alt="Logo" />
          </div>
          <div style={{ color: '#616161', fontSize: '35px', fontWeight: 'lighter',marginTop: '25px' }}>

            fundoo
                </div>
<div style={{width:'100%',marginTop:'-105px'}}>
            <div style={{ marginTop: '130px' }} ><div style={{ color: '#616161',fontSize: '25px', fontFamily: 'serif', padding: '73px', marginLeft: '-175px',paddingBottom:'42px' }}>Registration</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '15px', marginLeft: '-175px'}}>
              
               
                <TextField

                  required={true}
                  error={this.state.err2}
                  id="Username"
                  label="Username"
                  variant="outlined"
                  value={this.state.Username}
                  onChange={this.onchangeUsername}
                  className={classes.paper}
                  helperText={this.helperusernameMethod}
                />
              
               
                <TextField
                  required={true}
                  error={this.state.err3}
                  id="Firstname"
                  label="Firstname"
                  variant="outlined"
                  value={this.state.Firstname}
                  onChange={this.onchangeFirstname}
                  className={classes.paper}
                />
            </div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '15px', marginLeft:'-175px' }}>
            
              <TextField
                required={true}
                id="Lastname"
                label="Lastname"
                variant="outlined"
                value={this.state.Lastname}
                onChange={this.onchangeLastname}
                className={classes.paper}
              />
            
             
              <TextField

                required={true}
                error={this.state.err1}
                id="Email"
                label="Email"
                variant="outlined"
                value={this.state.Email}
                onChange={this.onchangeEmail}
                 helperText={this.helpermailMethod}

              />
           
            </div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '20px', marginLeft: '-175px' }}>
           
              <TextField

                required={true}
                id="Password"
                label="Password"
                type="password"
                variant="outlined"
                value={this.state.Password}
                onChange={this.onchangePassword}
                className={classes.paper}
              />
              <TextField

                required={true}
                id="Passwordagain"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={this.state.Passwordagain}
                onChange={this.onchangePasswordagain}
                className={classes.paper}
              />
            </div>
            
                <div style={{marginLeft:'-255px'}}>
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
                <div style={{marginLeft:'14px',marginTop:'-36px'}}>
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
