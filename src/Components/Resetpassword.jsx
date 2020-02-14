import React, { Component } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
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
                alert("YPassword has been reset")
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
            <div className="mainLogin" >
                <Container maxWidth="sm">
                    <form className="Login" style={{ width: "50%" }} >
                        <h3 className="fundoohead">fundoonotes</h3>


                        <div className="row" style={{ width: "300%" }}>

                            <div className="col s6 Reg-Password">
                                <TextField
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
                        </div>


                        <div className="row" style={{ width: "300%" }}>

                            <div className="col s6 Reg-Password">
                                <TextField
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
                        </div>




                    </form>
                </Container>
            </div>
        );
    }
}

export default ResetPassword
