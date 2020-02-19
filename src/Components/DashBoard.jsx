import React, { Component } from 'react'
import AppNavBar from './AppBar'
import SideNavBar from './SideBar'
import SimpleExpansionPanel from './TakeNote'


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
                <SimpleExpansionPanel />


            </div>
        )
    }
}

export default DashBoard
