import React, { Component } from 'react'
import AppNavBar from './AppBar'
import SideNavBar from './SideBar'
import NotesMenu from './NotesMenu'


class DashBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true

        }
    }

    handleDraweropen = () => {

        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div>
               
                <AppNavBar handleDraweropen={this.handleDraweropen} />
                <SideNavBar show={this.state.open} />
                <NotesMenu open={this.state.open} />


            </div>
        )
    }
}

export default DashBoard
