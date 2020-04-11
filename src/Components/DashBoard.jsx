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
      labelName: "",
      heading: "fundoo"
    };
  }

  handleDraweropen = () => {
    this.setState({ open: !this.state.open });
  };

  handleNotesMenu = async () => {
    await this.setState({
      notesOpen: true,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false,
      heading: "fundoo"
    });
  };
  handleRemindersMenu = async () => {
    await this.setState({
      notesOpen: false,
      remindersOpen: true,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false,
      heading: "Reminders"
    });
  };

  handleArchiveMenu = async () => {
    await this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: true,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false,
      heading: "Archive"
    });
  };

  handleTrashMenu = async () => {
    await this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: true,
      editlabelsOpen: false,
      labelNoteOpen: false,
      heading: "Trash"
    });
  };

  handleEditLabelsMenu = async () => {
    await this.setState({
      editlabelsOpen: !this.state.editlabelsOpen,
      openDialog: !this.state.openDialog
    });
  };

  handleLabelNoteMenu = async data3 => {
    await this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: true,
      labelName: data3,
      heading: data3
    });
  };

  componentDidMount() {
    this.getNote();
    this.getLabel();
  }

  handleSignout = async () => {
    localStorage.removeItem("logintoken");
    this.props.history.push("/login");
  };
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
    return (
      <div>
        {this.state.jwt === localStorage.getItem("logintoken") ? (
          <div>
            <div>
              <AppNavBar
                handleDraweropen={this.handleDraweropen}
                handleSignout={this.handleSignout}
                heading={this.state.heading}
              />
            </div>

            <div style={{ display: "flex", background: "" }}>
              <SideNavBar
                handleNotesMenu={this.handleNotesMenu}
                handleRemindersMenu={this.handleRemindersMenu}
                handleArchiveMenu={this.handleArchiveMenu}
                handleTrashMenu={this.handleTrashMenu}
                handleEditLabelsMenu={this.handleEditLabelsMenu}
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                notesOpen={this.state.notesOpen}
                remindersOpen={this.state.remindersOpen}
                labelNoteOpen={this.state.labelNoteOpen}
                archiveOpen={this.state.archiveOpen}
                trashOpen={this.state.trashOpen}
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
                obj3={this.state.getLabelArr}
              />
            </div>
            <div>
              <TrashMenu
                obj={this.state.getNoteArr}
                getNote={this.getNote}
                trashOpen={this.state.trashOpen}
                open={this.state.open}
                getLabel={this.getLabel}
                obj3={this.state.getLabelArr}
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
