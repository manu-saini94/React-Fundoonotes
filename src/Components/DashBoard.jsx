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
import ProfilePicture from "./ProfilePicture";
import UserController from "../Controller/UserController";

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
      heading: "fundoo",
      view: false,
      profilePicture: "",
      uniqLabels: [],
    };
  }

  handleDraweropen = () => {
    this.setState({ open: !this.state.open });
  };

  componentWillReceiveProps(props) {
    this.setState({
      jwt: props.match.params.jwt,
    });
  }
  handleNotesMenu = async () => {
    await this.setState({
      notesOpen: true,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: false,
      heading: "fundoo",
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
      heading: "Reminders",
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
      heading: "Archive",
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
      heading: "Trash",
    });
  };

  handleEditLabelsMenu = async () => {
    await this.setState({
      editlabelsOpen: !this.state.editlabelsOpen,
      openDialog: !this.state.openDialog,
    });
  };

  handleLabelNoteMenu = async (data3) => {
    await this.setState({
      notesOpen: false,
      remindersOpen: false,
      archiveOpen: false,
      trashOpen: false,
      editlabelsOpen: false,
      labelNoteOpen: true,
      labelName: data3,
      heading: data3,
    });
  };

  handleSearchMenu = async () => {};

  componentDidMount() {
    this.getNote();
    this.getLabel();
    this.getProfilePic();
  }
  handleRefresh = async () => {
    if (this.state.notesOpen) {
      await this.setState({ notesOpen: false });
      await this.setState({ notesOpen: true });
    } else if (this.state.remindersOpen) {
      await this.setState({ remindersOpen: false });
      await this.setState({ remindersOpen: true });
    } else if (this.state.archiveOpen) {
      await this.setState({ archiveOpen: false });
      await this.setState({ archiveOpen: true });
    } else if (this.state.trashOpen) {
      await this.setState({ trashOpen: false });
      await this.setState({ trashOpen: true });
    } else if (this.state.labelNoteOpen) {
      await this.setState({ labelNoteOpen: false });
      await this.setState({ labelNoteOpen: true });
    }
  };

  getProfilePic = async () => {
    let fileName = localStorage.getItem("profilepicture");
    if (fileName !== null) {
      UserController.getprofilepic(fileName).then((res) => {
        if (res.status === 200) {
          let url = res.data.object;
          this.setState({
            profilePicture: url,
          });
          console.log("profile pic url is :", this.state.profilePicture);
        }
      });
    }
  };
  handleSignout = async () => {
    localStorage.removeItem("logintoken");
    this.props.history.push("/login");
  };
  getNote = async () => {
    let data = await Controller.getNotes().then((res) => {
      this.setState({
        getNoteArr: res,
      });
    });
  };

  getLabel = async () => {
    let datalabels = await LabelController.getLabels().then((res) => {
      this.setState({
        getLabelArr: res,
      });
    });
  };

  handleView = async () => {
    await this.setState({
      view: !this.state.view,
    });
    console.log("view val :", this.state.view);
  };

  calcLabels = async () => {
    var tempArr = [];
    this.state.getNoteArr.map((item) => {
      if (item.labels.length != 0) {
        item.labels.forEach((element) => {
          tempArr.push(element);
        });
      }
    });
    return tempArr;
  };
  calcCollabs = async () => {
    var tempArr = [];
    this.state.getNoteArr.map((item) => {
      if (item.collaborator.length != 0) {
        item.collaborator.forEach((element) => {
          tempArr.push(element);
        });
      }
    });
    return tempArr;
  };
  calcColors = async () => {
    var tempArr = [];
    this.state.getNoteArr.map((item) => {
      if (item.color !== "") {
        tempArr.push(item.color);
      }
    });
    return tempArr;
  };

  handleSearchClick = async () => {
    var uniqueLabelArray = [];
    var uniqueCollabArray = [];
    var uniqueColorArray = [];
    this.calcLabels().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (uniqueLabelArray.indexOf(data[i].labelname) === -1) {
          uniqueLabelArray.push(data[i].labelname);
        }
      }
      console.log("the unique label array is :", uniqueLabelArray);
    });

    this.calcCollabs().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (uniqueCollabArray.indexOf(data[i].collaborator) === -1) {
          uniqueCollabArray.push(data[i].collaborator);
        }
      }
      console.log("the unique collaborator array is :", uniqueCollabArray);
    });

    this.calcColors().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (uniqueColorArray.indexOf(data[i]) === -1) {
          uniqueColorArray.push(data[i]);
        }
      }
      console.log("the unique color array is :", uniqueColorArray);
    });
  };

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
                handleRefresh={this.handleRefresh}
                handleView={this.handleView}
                profilePicture={this.state.profilePicture}
                handleSearchClick={this.handleSearchClick}
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
                labelName={this.state.labelName}
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
                view={this.state.view}
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                profilePicture={this.state.profilePicture}
              />
            </div>

            <div>
              <RemindersMenu
                obj={this.state.getNoteArr}
                obj3={this.state.getLabelArr}
                getNote={this.getNote}
                remindersOpen={this.state.remindersOpen}
                open={this.state.open}
                view={this.state.view}
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                profilePicture={this.state.profilePicture}
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
                view={this.state.view}
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                profilePicture={this.state.profilePicture}
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
                view={this.state.view}
                handleLabelNoteMenu={this.handleLabelNoteMenu}
                profilePicture={this.state.profilePicture}
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
                view={this.state.view}
              />
            </div>

            {/* <div>
              <ProfilePicture />
            </div> */}
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
