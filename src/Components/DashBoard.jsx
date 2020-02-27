import React, { Component } from 'react'
import AppNavBar from './AppBar'
import SideNavBar from './SideBar'
import NotesMenu from './NotesMenu'
import CreateNote from './CreateNote'


class DashBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            noteOpen: true

        }
    }

    handleDraweropen = () => {

        this.setState({ open: !this.state.open })
    }


    componentDidMount() {
        //    this.notemenu();
    }

    // notemenu =
    //     <NotesMenu open={this.state.open} />

    render() {
        return (
            <div>
                <div>
                    <AppNavBar handleDraweropen={this.handleDraweropen} />
                </div>

                <div style={{ display: 'flex', background: '' }}>
                    <SideNavBar show={this.state.open} />
                </div>
                <div style={{ background: '' }}>
                    <NotesMenu open={this.state.open} />
                </div>



            </div>
        )
    }
}

export default DashBoard
