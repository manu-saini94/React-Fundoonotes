import React, { Component } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Controller from '../Controller/UserController';
import TextField from "@material-ui/core/TextField";
import "./User.css";
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom'

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


class Problem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            err1: false,
            err2: false,
            error: false,
            message: "",

        };
    }



    signupPage = () => {

        this.props.history.push('/register')
    }
    helpermailMethod = () => {
        if (this.state.err1) {
            return "Not a valid mail id"
        }
    }
    helperpasswordMethod = () => {
        if (this.state.err5) {
            return "enter between 8 to 20 characters "
        }
    }
    onchangeEmail = async event => {

        await this.setState({ Email: event.target.value });

        if (/^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(this.state.Email)) {
            this.setState({ err1: false });

        }
        else {
            this.setState({ err1: true });
        }

    };



    onchangePassword = async event => {
        await this.setState({ Password: event.target.value });
        var pass = this.state.Password;

        if (pass.length < 8 || pass.length > 20) {
            this.setState({ err5: true });

        }
        else {
            this.setState({ err5: false });
        }
    }



    onSubmit = () => {
        var loginDetails = {

            email: this.state.Email,
            password: this.state.Password,

        }
        console.log(loginDetails)
        Controller.login(loginDetails).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                console.log("login....")
                let token = res.data.object
                console.log(token, "hello")
                localStorage.setItem("logintoken", token)

                this.props.history.push("/dashboard/" + res.data.object)

                this.setState({
                    error: true,
                    message: 'Login success'
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
                    <div style={{ marginTop: '14px', marginLeft: '14px' }}>
                        <img width='60px' height='60px' src={"https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"} alt="Logo" />
                    </div>
                    <div style={{ color: '#616161', fontSize: '35px', fontWeight: 'lighter', marginTop: '25px' }}>

                        fundoo
                </div>
                    <div style={{ width: '100%', marginTop: '-105px' }}>

                        <div style={{ marginTop: '130px' }} >
                            <div style={{
                                color: '#c62828', fontSize: '30px', fontFamily: 'serif', paddingTop: '54px',
                                paddingLeft: '-26px',
                                marginLeft: '-153px'
                            }}>Oops! Something went wrong</div>
                            <div style={{ color: '#616161', fontSize: '30px', fontFamily: 'serif', paddingTop: '27px', marginLeft: '-175px', paddingBottom: '53px' }}>Login</div>

                            <div style={{ paddingBottom: '23px', paddingRight: '176px' }}>
                                <TextField
                                    required={true}
                                    error={this.state.err1}
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    value={this.state.Email}
                                    onChange={this.onchangeEmail}
                                    helperText={this.helpermailMethod()}

                                />
                            </div>
                            <div style={{ paddingRight: '176px', paddingBottom: '19px' }}>
                                <TextField
                                    required={true}
                                    error={this.state.err5}
                                    id="Password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={this.state.Password}
                                    onChange={this.onchangePassword}
                                    className={classes.paper}
                                    helperText={this.helperpasswordMethod()}

                                />
                            </div>
                        </div>
                        <div style={{ paddingRight: '177px', paddingBottom: '10px' }}>
                            <a href="/forgot">forgot password?</a>
                        </div>

                        <div style={{ marginLeft: '-264px' }}>
                            <Button
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className={classes.paper}
                                style={{ color: "blue" }}
                                onClick={this.onSubmit}
                            >
                                Login
                </Button>
                        </div>
                        <div style={{ marginLeft: '215px', marginTop: '-36px', paddingRight: '191px' }}>
                            <Button
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className={classes.paper}
                                style={{ color: "blue" }}
                                onClick={this.signupPage}
                            >
                                Signup
                </Button>
                        </div>
                    </div>
                </Box>
            </div>


        );
    }
}

export default withRouter(Problem)



