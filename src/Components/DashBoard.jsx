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
import LabelMenu from "../Components/LabelMenu";

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
      labelNoteOpen: false,
      openDialog: false,
      getNoteArr: [],
      getLabelArr: [],
      labelName: ""
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
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false
    });
  };
  handleRemindersMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: true,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false
    });
  };

  handleArchiveMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: true,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false
    });
  };

  handleTrashMenu = () => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: true,
      editlabelsOpen: false,
      labelNoteOpen: false
    });
  };

  handleEditLabelsMenu = () => {
    this.setState({
      editlabelsOpen: !this.state.editlabelsOpen,
      openDialog: !this.state.openDialog
    });
  };

  handleLabelNoteMenu = data3 => {
    this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: true,
      labelName: data3
    });
    console.log("llllnamelllname :", this.state.labelName);
  };
  componentDidMount() {
    this.getNote();
    this.getLabel();
  }
  getNote = async () => {
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
    console.log("cont : ", this.state.getLabelArr);
  };

  // getLabelsForNote = async () => {
  //   let labelsfornote = await LabelController.getLabelsInsideNote().then(res => {
  //     this.setState({
  //       getNoteLabelArr: res
  //     });
  //     console.log("note labels are : ", this.state.getNoteLabelArr);

  //   });
  // }
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
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                labelNoteOpen={this.state.labelNoteOpen}
                handleDialogOpen={this.handleDialogOpen}
                show={this.state.open}
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                obj3={this.state.getLabelArr}
                getLabel={this.getLabel}
                getNoteLabelArr={this.getNoteLabelArr}
              />
            </div>
            <div>
              <NotesMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                notesOpen={this.state.notesOpen}
                open={this.state.open}
                getLabel={this.getLabel}
                obj3={this.state.getLabelArr}
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
              <LabelMenu
                obj={this.state.getNoteArr}
                labelName={this.state.labelName}
                labelNoteOpen={this.state.labelNoteOpen}
                getNote={this.getNote}
                getLabel={this.getLabel}
                obj3={this.state.getLabelArr}
                open={this.state.open}
              />
            </div>
            <div>
              <EditLabelsMenu
                editlabelsOpen={this.state.editlabelsOpen}
                open={this.state.open}
                openDialog={this.state.openDialog}
                handleEditLabelsMenu={this.handleEditLabelsMenu}
                obj2={this.state.getLabelArr}
                getLabel={this.getLabel}
                getNote={this.getNote}
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
