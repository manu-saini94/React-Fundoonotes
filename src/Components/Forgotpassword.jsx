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

class Forgotpassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            error: false,
            message: ""
        };
    }





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



    onSubmit = () => {
        var forgotDetails = {

            email: this.state.Email,


        }
        console.log(forgotDetails)
        Controller.forgotpassword(forgotDetails).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                alert("Reset Link sent to your mail-id")
                this.props.history.push("/login")
                this.setState({
                    error: true,
                    message: 'Login Page'
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

export default Forgotpassword
