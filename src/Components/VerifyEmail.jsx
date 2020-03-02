import React, { Component } from 'react'
import Controller from '../Controller/UserController';


class VerifyEmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            message: "",
            jwt: this.props.match.params.jwt
        }
    }
    verificationMethod = () => {

        Controller.verification(this.state.jwt).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                this.props.history.push("/login")
                this.setState({
                    error: true,
                    message: 'Email Verified'
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

        return (
            <div>

            </div>
        )
    }
}

export default VerifyEmail
