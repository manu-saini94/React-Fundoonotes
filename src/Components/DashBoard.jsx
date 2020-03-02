import React, { Component } from 'react'
import AppNavBar from './AppBar'
import SideNavBar from './SideBar'
import NotesMenu from './NotesMenu'
import CreateNote from './CreateNote'
import Problem from './ProblemEncounterd'


class DashBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            allNotes: [],
            jwt: this.props.match.params.jwt,
            notesOpen: true,
            remindersOpen: false,



        }
    }

    handleDraweropen = () => {

        this.setState({ open: !this.state.open })
    }

    handleNotesMenu = () => {
        this.setState({ notesOpen: true })
    }

    componentDidMount() {
        //    this.notemenu();
    }

    // notemenu =
    //     <NotesMenu open={this.state.open} />

    render() {
        console.log("Dashboard component entered")
        console.log("jwt = ", this.state.jwt)
        console.log("token =", localStorage.getItem("logintoken"))
        return (

            <div>
                {this.state.jwt === localStorage.getItem("logintoken") ?
                    <div>
                        <div>
                            <AppNavBar handleDraweropen={this.handleDraweropen} />
                        </div>

                        <div style={{ display: 'flex', background: '' }}>
                            <SideNavBar handleNotesMenu={this.handleNotesMenu}
                                show={this.state.open} />
                        </div>
                        <div>
                            <NotesMenu notesOpen={this.state.notesOpen} open={this.state.open} />
                        </div>
                        <div>

                        </div>
                    </div>
                    :
                    <div>
                        <Problem />
                    </div>
                }

            </div>

        )
    }
}

export default DashBoard
