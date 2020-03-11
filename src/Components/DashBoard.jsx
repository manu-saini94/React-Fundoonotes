import React, { Component, PureComponent } from "react";
import AppNavBar from "./AppBar";
import SideNavBar from "./SideBar";
import NotesMenu from "./NotesMenu";
import CreateNote from "./CreateNote";
import Problem from "./ProblemEncounterd";
import RemindersMenu from "./RemindersMenu";
import Controller from "../Controller/UserController";
import NoteController from "../Controller/NoteController";
import GetNotes from "./GetNotes";
import LabelsMenu from "./EditLabelsMenu";
import ArchiveMenu from "./ArchiveMenu";
import TrashMenu from "./TrashMenu";
import EditLabelsMenu from "./EditLabelsMenu";
import LabelController from "../Controller/LabelController";

class DashBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      jwt: this.props.match.params.jwt,
      notesOpen: true,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      openDialog: false,
      getNoteArr: [],
      getLabelArr: []
    };
  }

  handleDialogClose = data => {
    this.setState({ openDialog: false });
  };

  handleDraweropen = () => {
    this.setState({ open: !this.state.open });
  };

  handleNotesMenu = () => {
    this.setState({
      notesOpen: true,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false
    });
  };
  handleRemindersMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: true,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false
    });
  };

  handleArchiveMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: true,
      trashOpen: false,
      editlabelsOpen: false
    });
  };

  handleTrashMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: true,
      editlabelsOpen: false
    });
  };

  handleEditLabelsMenu = () => {
    this.setState({
      editlabelsOpen: true,
      openDialog: true
    });
  };

  componentDidMount() {
    this.getNote();
    this.getLabel();
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

  getLabel = async () => {
    let datalabels = await LabelController.getLabels().then(res => {
      this.setState({
        getLabelArr: res
      });

    });
    console.log("cont : ", this.state.getLabelArr)
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
                handleEditLabelsMenu={this.handleEditLabelsMenu}
                handleDialogOpen={this.handleDialogOpen}
                show={this.state.open}
                obj2={this.state.getLabelArr}
                getLabel={this.getLabel}
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
            <div>
              <EditLabelsMenu
                editlabelsOpen={this.state.editlabelsOpen}
                open={this.state.open}
                openDialog={this.state.openDialog}
                handleDialogClose={this.handleDialogClose}
                obj2={this.state.getLabelArr}
                getLabel={this.getLabel}
              />
            </div>
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
