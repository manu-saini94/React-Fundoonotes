import React, { Component } from 'react'
import AppNavBar from './AppBar'
import SideNavBar from './SideBar'
import NotesMenu from './NotesMenu'
import CreateNote from './CreateNote'
import Problem from './ProblemEncounterd'
import RemindersMenu from './RemindersMenu'
import Controller from '../Controller/UserController';
import GetNotes from './GetNotes'
import LabelsMenu from './LabelsMenu';
import ArchiveMenu from './ArchiveMenu';
import TrashMenu from './TrashMenu';

class DashBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            jwt: this.props.match.params.jwt,
            notesOpen: true,
            remindersOpen: false,
            getNoteArr: []


        }
    }

    handleDraweropen = () => {

        this.setState({ open: !this.state.open })
    }

    handleNotesMenu = () => {
        this.setState({ notesOpen: true })
    }
    handleRemindersMenu = () => {
        this.setState({
            notesOpen: false,
            remindersOpen: true
        })
    }
    componentDidMount() {
        this.getNote();
    }
    getNote = () => {

        // Controller.getNotes().th

        //     this.setState({ getNoteArr: res.data.object })
        //     console.log("Notes...", this.state.getNoteArr)
        // })
        let data = Controller.getNotes().then(res => {
            this.setState({
                getNoteArr: res
            })
        })
        // console.log(data.id, "opipoipoi");

        // let datas = [];
        // data.forEach(el => {
        //     datas.push(el)
        // });
        // this.setState({
        //     getNoteArr: datas
        // })
    }

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
                                handleRemindersMenu={this.handleRemindersMenu}
                                show={this.state.open} />
                        </div>
                        <div>
                            <NotesMenu obj={this.state.getNoteArr} getNote={this.getNote} notesOpen={this.state.notesOpen} open={this.state.open} />
                        </div>

                        <div>
                            <RemindersMenu remindersOpen={this.state.remindersOpen} open={this.state.open} />
                        </div>
                        <div>
                            <LabelsMenu />
                        </div>
                        <div>
                            <ArchiveMenu />
                        </div>
                        <div>
                            <TrashMenu />
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
