import React, { Component } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Controller from '../Controller/UserController';
import TextField from "@material-ui/core/TextField";
import "./User.css";
import Box from '@material-ui/core/Box';

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1.5,
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


class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: "",
            newPasswordagain: "",
            error: false,
            message: "",
            jwt: this.props.match.params.jwt
        };
    }





    onchangenewPassword = event => {
        this.setState({ newPassword: event.target.value });
    };



    onchangenewPasswordagain = event => {
        this.setState({ newPasswordagain: event.target.value });
    };



    onSubmit = () => {
        var resetDetails = {

            newpassword: this.state.newPassword,
            confirmnewpassword: this.state.newPasswordagain

        }
        console.log(resetDetails)
        Controller.resetpassword(resetDetails, this.state.jwt).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                alert("Your Password has been reset")
                this.props.history.push("/login")
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
                        <div style={{ marginTop: '130px' }} ><div style={{ color: '#616161', fontSize: '30px', fontFamily: 'serif', padding: '73px', marginLeft: '-175px', paddingBottom: '53px', paddingTop: '91px' }}>Reset Password</div>
                            <div style={{ paddingBottom: '23px', paddingRight: '176px' }}>
                                < TextField
                                    required={true}
                                    error={this.state.error}
                                    id="newPassword"
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    value={this.state.newPassword}
                                    onChange={this.onchangenewPassword}
                                    className={classes.paper}
                                />
                            </div>
                            <div style={{ paddingRight: '176px', paddingBottom: '30px' }}>

                                < TextField
                                    required={true}
                                    error={this.state.error}
                                    id="newPasswordagain"
                                    label="Confirm"
                                    type="password"
                                    variant="outlined"
                                    value={this.state.newPasswordagain}
                                    onChange={this.onchangenewPasswordagain}
                                    className={classes.paper}
                                />
                            </div>
                        </div>


                        <div style={{ marginLeft: '-264px', paddingLeft: '142px' }}>
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
                        <div style={{ marginLeft: '215px', marginTop: '-36px', paddingRight: '191px' }}>

                        </div>
                    </div>
                </Box>
            </div>
        );
    }
}

export default ResetPassword







