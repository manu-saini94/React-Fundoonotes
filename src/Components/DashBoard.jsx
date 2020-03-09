import React, { Component, PureComponent } from "react";
import AppNavBar from "./AppBar";
import SideNavBar from "./SideBar";
import NotesMenu from "./NotesMenu";
import CreateNote from "./CreateNote";
import Problem from "./ProblemEncounterd";
import RemindersMenu from "./RemindersMenu";
import Controller from "../Controller/UserController";
import GetNotes from "./GetNotes";
import LabelsMenu from "./EditLabelsMenu";
import ArchiveMenu from "./ArchiveMenu";
import TrashMenu from "./TrashMenu";

class DashBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      jwt: this.props.match.params.jwt,
      notesOpen: true,
      remindersOpen: false,
      getNoteArr: []
    };
  }

  handleDraweropen = () => {
    this.setState({ open: !this.state.open });
  };

  handleNotesMenu = () => {
    this.setState({
      notesOpen: true,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false
    });
  };
  handleRemindersMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: true,
      archiveOpen: false,
      trashOpen: false
    });
  };

  handleArchiveMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: true,
      trashOpen: false
    });
  };

  handleTrashMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: true
    });
  };

  handleLabelsMenu = () => {

  }

  componentDidMount() {
    this.getNote();
  }
  getNote = async () => {
    // Controller.getNotes().th

    //     this.setState({ getNoteArr: res.data.object })
    //     console.log("Notes...", this.state.getNoteArr)
    // })
    let data = await Controller.getNotes().then(res => {
      this.setState({
        getNoteArr: res
      });
    });
  };

  render() {
    console.log("Dashboard component entered");
    console.log("jwt = ", this.state.jwt);
    console.log("token =", localStorage.getItem("logintoken"));
    return (
      <div>
        {this.state.jwt === localStorage.getItem("logintoken") ? (
          <div>
            <div>
              <AppNavBar handleDraweropen={this.handleDraweropen} />
            </div>

            <div style={{ display: "flex", background: "" }}>
              <SideNavBar
                handleNotesMenu={this.handleNotesMenu}
                handleRemindersMenu={this.handleRemindersMenu}
                handleArchiveMenu={this.handleArchiveMenu}
                handleTrashMenu={this.handleTrashMenu}
                handleLabelsMenu={this.handleLabelsMenu}
                show={this.state.open}
              />
            </div>
            <div>
              <NotesMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                notesOpen={this.state.notesOpen}
                open={this.state.open}
              />
            </div>

            <div>
              <RemindersMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                remindersOpen={this.state.remindersOpen}
                open={this.state.open}
              />
            </div>
            <div>{/* <EditLabelsMenu  /> */}</div>
            <div>
              <ArchiveMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                archiveOpen={this.state.archiveOpen}
                open={this.state.open}
              />
            </div>
            <div>
              <TrashMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                trashOpen={this.state.trashOpen}
                open={this.state.open}
              />
            </div>
          </div>
        ) : (
            <div>
              <Problem />
            </div>
          )}
      </div>
    );
  }
}

export default DashBoard;
