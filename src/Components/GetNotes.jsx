import React, { PureComponent, Fragment } from "react";
import Card from "@material-ui/core/Card";
import {
  InputBase,
  MuiThemeProvider,
  createMuiTheme,
  MenuItem,
  Tooltip,
  Grid,
  makeStyles,
  Menu,
  Dialog,
  ReactFragment,
  Popover,
  Chip,
  Avatar,
  Divider,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

import MoreVertTwoToneIcon from "@material-ui/icons/MoreVertTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import Pin from "../IMG/pin.svg";
import Unpin from "../IMG/unpin.svg";
import "../App.css";
import "../Notes.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import NoteController from "../Controller/NoteController";
import LabelController from "../Controller/LabelController";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import Controller from "../Controller/UserController";
import GetLabelsInNoteMenu from "../Components/GetLabelsInNoteMenu";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";

const saveclose = "Save & Close";
let array = [];
let arrcollab1 = [];
let rem = "";

class GetNotes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data.title,
      description: this.props.data.takeanote,
      id: this.props.data.id,
      isArchived: this.props.data.archived,
      isPinned: this.props.data.pinned,
      isTrashed: this.props.data.trashed,
      color: this.props.data.color,
      remState: this.props.data.reminder,
      createdTime: this.props.data.createdtime,

      getNoteLabelArr: [],
      colorAnchor: null,
      openSnack: false,
      open: false,
      openDialog: false,
      labelMenu: false,
      menu: false,
      labelAnchor: null,
      hoverMoreTooltip: false,
      allLabels: this.props.data.labels,
      obj3: this.props.obj3,
      hoverColorTooltip: false,
      labelName: "",
      collaborators: this.props.data.collaborator,
      collabOpen: false,
      disable: true,
      collabName: "",
      err1: false,
      fromArchive: this.props.fromArchive,
      reminderMenu: false,
      reminderAnchor: null,
      selectedDate: this.props.data.reminder,
      profilePicture: localStorage.getItem("profilepicture"),
      view: this.props.view,
      profilePicture: this.props.profilePicture,

      manycolor: [
        { name: "Red", colorCode: "#ef9a9a" },
        { name: "Cyan", colorCode: "#80deea" },
        { name: "Blue", colorCode: "#2196f3" },
        { name: "Indigo", colorCode: "#9fa8da" },
        { name: "LightBlue", colorCode: "#90caf9" },
        { name: "Purple", colorCode: "#b39ddb" },
        { name: "Yellow", colorCode: "#c5e1a5" },
        { name: "Lime", colorCode: "#e6ee9c" },
        { name: "Pink", colorCode: "#f48fb1" },
        { name: "gray", colorCode: "#eeeeee" },
        { name: "Brown", colorCode: "#bcaaa4" },
        { name: "White", colorCode: "#FDFEFE" },
      ],

      defaultColour: "#FDFEFE",
      colorOpen: false,
      opencolourBox: false,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      title: props.data.title,
      description: props.data.takeanote,
      id: props.data.id,
      isArchived: props.data.archived,
      isPinned: props.data.pinned,
      isTrashed: props.data.trashed,
      color: props.data.color,
      remState: props.data.reminder,
      createdTime: props.data.createdtime,
      selectedDate: props.data.reminder,
      obj3: props.obj3,
      allLabels: props.data.labels,
      collaborators: props.data.collaborator,
      fromArchive: props.fromArchive,
      view: props.view,
      profilePicture: props.profilePicture,
    });
  }

  handleLabel = async (data) => {
    for (let index = 0; index < this.state.allLabels.length; index++) {
      array.push(this.state.allLabels[index]);
    }

    array.push(data);
    await this.setState({
      allLabels: array,
      labelpresent: true,
    });
  };
  handleLabelRemove = async (data) => {
    for (let index = 0; index < this.state.allLabels.length; index++) {
      array.push(this.state.allLabels[index]);
    }
    for (let index = 0; index < array.length; index++) {
      if (array[index].labelname === data.labelname) {
        array.splice(index, 1);
      }
    }
    await this.setState({
      allLabels: array,
    });
    if (this.state.allLabels.length === 0) {
      this.setState({ labelpresent: false });
    }
  };
  handleDoneClick = async () => {
    if (this.state.labelName !== "") {
      var labelDetails = {
        labelname: this.state.labelName,
      };

      await LabelController.newlabelforuser(labelDetails).then((res) => {
        if (res.status === 200) {
          console.log("Successfully added label for user");
        }
      });

      await NoteController.addlabeltonote(
        labelDetails,
        this.props.data.id
      ).then((res) => {
        if (res.status === 200) {
          console.log("Label added to the note successfully");
        }
      });
    }
    await this.setState({ labelName: "" });
    this.props.getLabel();
    this.props.getNote();
  };
  onChangeLabelName = async (event) => {
    await this.setState({ labelName: event.target.value });
    console.log(this.state.labelName);
  };
  handleCancel = async () => {
    await this.setState({ labelName: "" });
  };

  handleReminderClick = async (event) => {
    await this.setState({
      reminderMenu: true,
      reminderAnchor: event.currentTarget,
    });
  };

  handleLabelMenuOpen = () => {
    this.setState({
      labelMenu: true,
      menu: false,
      hoverMoreTooltip: true,
    });
  };

  handleMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({
      menu: false,
      hoverMoreTooltip: false,
      reminderMenu: false,
    });
  };

  handleLabelMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({
      labelMenu: false,
      hoverMoreTooltip: false,
    });
  };

  handleDeleteNote = async () => {
    await this.setState({ isTrashed: true });
    await NoteController.deletenote(this.state.id).then((res) => {
      if (res.status === 200) {
        console.log("Note Deleted Successfully");
      }
    });
    this.props.getNote();
  };

  MenuClose = () => {
    this.setState({ menu: false });
  };

  changeLabel = (event) => {
    this.setState({
      menu: true,
      labelAnchor: event.currentTarget,
      hoverMoreTooltip: true,
    });
  };

  handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({ openSnack: false });
  };

  handleTooltipClose = (async) => {
    this.setState({
      openTooltip: false,
    });
  };
  handleTooltipOpen = (async) => {
    this.setState({
      openTooltip: true,
    });
  };
  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };
  handleDialogClose = (data) => {
    this.setState({ openDialog: false });
  };

  closeColorBox = () => {
    this.setState({
      colorOpen: false,
      colorAnchor: null,
      hoverColorTooltip: false,
    });
  };
  changeColor = (event) => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
      hoverColorTooltip: true,
    });
  };
  changeNoteColor = async (event) => {
    await this.setState({
      color: event.target.value,
      openTooltip: false,
      hoverColorTooltip: false,
    });

    await NoteController.colornote(this.state.id, this.state.color).then(
      (res) => {
        if (res.status === 200) {
          console.log("Color set Successfully");
        }
      }
    );
    this.props.getNote();
  };
  handleDeleteLabel = async (x) => {
    await NoteController.deletelabelfornote(this.props.data.id, x).then(
      (res) => {
        if (res.status === 200) {
          console.log("Label deleted for the note successfully");
        }
      }
    );
    this.props.getNote();
  };

  handleReminder = async (event) => {
    await this.setState({
      selectedDate: event.target.value,
    });
    console.log("date is :", this.state.selectedDate);
  };
  handleSaveReminder = async () => {
    if (this.state.selectedDate === "") {
      await this.setState({
        remState: null,
        reminderMenu: false,
        selectedDate: "",
      });
      var noteDetails = {
        id: this.state.id,
        title: this.state.title,
        takeanote: this.state.description,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };
      await NoteController.updatenote(noteDetails).then((res) => {
        if (res.status === 200) {
          console.log("Note updated successfully");
          this.props.getNote();
        }
      });
    } else if (this.state.selectedDate !== "") {
      let date = new Date(this.state.selectedDate);
      let val = "";
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      let remVal = val.concat(
        date.toLocaleString("default", { month: "long" }),
        " ",
        date.getDate(),
        " ",
        date.getFullYear(),
        " ",
        strTime
      );
      console.log("rem value is : ", remVal);

      await this.setState({
        remState: remVal,
        reminderMenu: false,
      });
      var noteDetails = {
        id: this.state.id,
        title: this.state.title,
        takeanote: this.state.description,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };
      await NoteController.updatenote(noteDetails).then((res) => {
        if (res.status === 200) {
          console.log("Note updated successfully");
          this.props.getNote();
        }
      });
    }
  };

  handleReminderDelete = async () => {
    await this.setState({
      remState: null,
      selectedDate: null,
    });
    var noteDetails = {
      id: this.state.id,
      title: this.state.title,
      takeanote: this.state.description,
      trashed: this.state.isTrashed,
      archived: this.state.isArchived,
      pinned: this.state.isPinned,
      color: this.state.color,
      labelName: this.state.labelName,
      reminder: this.state.selectedDate,
    };
    await NoteController.updatenote(noteDetails).then((res) => {
      if (res.status === 200) {
        console.log("Note updated successfully");
        this.props.getNote();
      }
    });
  };

  handleCollabOpen = async () => {
    await this.setState({ collabOpen: true });
  };
  onChangeCollabName = async (event) => {
    await this.setState({ collabName: event.target.value });

    if (
      /^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(
        this.state.collabName
      )
    ) {
      this.setState({ err1: false });
      if (this.state.collabName !== "") {
        await this.setState({ disable: false });
      }
    } else if (this.state.collabName === "") {
      this.setState({ err1: false, disable: true });
    } else {
      this.setState({ err1: true });
    }
  };
  helpercollabmethod = () => {
    if (this.state.err1) {
      return "Not a valid mail id";
    }
  };
  handleCollabDoneClick = async () => {
    arrcollab1.push(this.state.collabName);

    let collabDetails = {
      noteId: this.props.data.id,
      collaborator: this.state.collabName,
    };
    await NoteController.addcollabtonote(collabDetails).then((resp) => {
      if (resp.status === 200) {
        console.log("Collaborator added to note");
        this.props.getNote();
      }
    });
    await this.setState({
      collabName: "",
      disable: true,
    });
  };
  handleRemoveCollab = async (data, item) => {
    let collabDetails = {
      noteId: this.props.data.id,
      collaborator: item,
    };
    NoteController.deletecollabfromnote(collabDetails).then((resp) => {
      if (resp.status === 200) {
        console.log("Collaborator added to note");
        this.props.getNote();
      }
    });
  };
  // handleRemoveCollab1 = async (data, item) => {
  //   for (let index = 0; index < arrcollab1.length; index++) {
  //     console.log("man", item);
  //     if (item === arrcollab1[index]) {
  //       arrcollab1.splice(index, 1);
  //       await this.setState({
  //         collaborators1: arrcollab1
  //       });
  //     }
  //   }
  // };
  handleCollabSave = async () => {
    await this.setState({
      collabOpen: false,
    });
    arrcollab1 = [];
  };
  handleCollabCancel = async () => {
    if (arrcollab1.length !== 0) {
      for (let index = 0; index < arrcollab1.length; index++) {
        let collabDetails = {
          noteId: this.props.data.id,
          collaborator: arrcollab1[index],
        };
        NoteController.deletecollabfromnote(collabDetails).then((resp) => {
          if (resp.status === 200) {
            console.log("Collaborator added to note");
          }
        });
      }
    }
    arrcollab1 = [];
    this.props.getNote();
    await this.setState({
      collabOpen: false,
    });
  };

  handleIsPinned = async () => {
    await this.setState({ isPinned: true });
    await NoteController.pinnote(this.state.id).then((res) => {
      if (res.status === 200) {
        console.log("Successfully pinned");
      }
    });

    this.props.getNote();
    await this.setState({
      archivemsg: "Note Pinned ",
      openSnack: true,
    });
  };

  handleDialogPinUnpin = async () => {
    await this.setState({ isPinned: !this.state.isPinned });
    if (this.state.isPinned) {
      this.setState({ isArchived: false });
    }
  };
  handleIsUnpinned = async () => {
    await this.setState({ isPinned: false });
    await NoteController.pinnote(this.state.id).then((res) => {
      if (res.status === 200) {
        console.log("Successfully Unpinned");
      }
    });
    this.props.getNote();
    await this.setState({
      archivemsg: "Note Unpinned ",
      openSnack: true,
    });
  };
  handleIsUnArchived = async () => {
    await this.setState({
      isPinned: false,
      isArchived: false,
    });

    await NoteController.archivenote(this.state.id).then((res) => {
      if (res.status === 200) {
        console.log("Successfully Unarchived");
      }
    });
    this.props.getNote();
    await this.setState({
      archivemsg: "Note Unarchived ",
      openSnack: true,
    });
  };
  handleIsArchived = async () => {
    console.log(
      "in archive",
      this.state.isPinned + "   " + this.state.isArchived
    );

    if (this.state.isPinned === true) {
      await this.setState({
        isPinned: false,
        isArchived: true,
      });

      await NoteController.archivenote(this.state.id).then((res) => {
        if (res.status === 200) {
          console.log("Successfully unpinned and archived");
        }
      });
      this.props.getNote();
      await this.setState({
        archivemsg: "Note Unpinned and Archived",
        openSnack: true,
      });
    } else {
      await this.setState({
        isArchived: true,
      });
      await NoteController.archivenote(this.state.id).then((res) => {
        if (res.status === 200) {
          console.log("successfully archived");
        }
      });
      this.props.getNote();
      await this.setState({
        archivemsg: "Note Archived",
        openSnack: true,
      });
    }
  };
  onCloseDialog = async () => {
    var noteDetails = {
      id: this.state.id,
      title: this.state.title,
      takeanote: this.state.description,
      createdtime: this.state.createdTime,
      trashed: this.state.isTrashed,
      archived: this.state.isArchived,
      pinned: this.state.isPinned,
      color: this.state.color,
      reminder: this.state.selectedDate,
      labelName: this.state.labelName,
    };

    await NoteController.setTitleDesc(noteDetails).then((res) => {
      console.log("hiii...", res);
      if (res.status === 200) {
        console.log(res.data.message);
      }
    });
    this.props.getNote();
    await this.setState({ openDialog: false });
  };
  render() {
    console.log("render prof pic", this.state.profilePicture);
    if (this.state.remState !== "") {
      let date = new Date(this.state.remState);
      let val = "";
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      let remVal = val.concat(
        date.toLocaleString("default", { month: "long" }),
        " ",
        date.getDate(),
        " ",
        date.getFullYear(),
        " ",
        strTime
      );
      rem = remVal;
    }
    let owner = localStorage.getItem("owner");

    const label = this.state.obj3.map((item) => {
      if (this.state.allLabels.length !== 0) {
        for (let i = 0; i < this.state.allLabels.length; i++) {
          let bool = this.state.allLabels[i].labelname === item.labelname;
          if (bool) {
            return (
              <GetLabelsInNoteMenu
                handleLabel={this.handleLabel}
                handleLabelRemove={this.handleLabelRemove}
                getLabel={this.props.getLabel}
                getNote={this.props.getNote}
                data={this.props.data}
                item={item}
                allLabels={this.state.allLabels}
                tick={true}
              />
            );
          }
          if (i === this.state.allLabels.length - 1) {
            return (
              <GetLabelsInNoteMenu
                handleLabel={this.handleLabel}
                handleLabelRemove={this.handleLabelRemove}
                getLabel={this.props.getLabel}
                getNote={this.props.getNote}
                data={this.props.data}
                item={item}
                allLabels={this.state.allLabels}
                tick={false}
              />
            );
          }
        }
      } else {
        return (
          <GetLabelsInNoteMenu
            handleLabel={this.handleLabel}
            handleLabelRemove={this.handleLabelRemove}
            getLabel={this.props.getLabel}
            getNote={this.props.getNote}
            data={this.props.data}
            item={item}
            allLabels={this.state.allLabels}
            tick={false}
          />
        );
      }
    });
    let displaylabels;
    if (this.state.allLabels.length !== 0) {
      console.log(this.state.allLabels, "all Labels");
      displaylabels = this.state.allLabels.map((el) => {
        console.log(el.labelname);
        let x;
        this.state.obj3.map((elem) => {
          if (elem.labelname === el.labelname) {
            x = elem.id;
          }
        });
        return (
          <div className="chip-style">
            <Chip
              label={el.labelname}
              onDelete={async () => {
                await NoteController.deletelabelfornote(
                  this.props.data.id,
                  x
                ).then((res) => {
                  if (res.status === 200) {
                    console.log("Label deleted for the note successfully");
                  }
                });
                this.props.getNote();
              }}
              deleteIcon={
                <Tooltip title="Remove Label" placement="top">
                  <CancelTwoToneIcon />
                </Tooltip>
              }
              onClick={this.handleLabelMenuOpen}
            />
          </div>
        );
      });
    }
    let displaycollabs;
    displaycollabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-style">
          <Tooltip title={item.collaborator}>
            <Avatar
              id="avatar"
              src="https://rocky123.s3.ap-south-1.amazonaws.com/kohli.jpg"
              onClick={this.handleCollabOpen}
            />
          </Tooltip>
        </div>
      );
    });

    let collabs;
    collabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-owner">
          <div style={{ marginLeft: "23px" }}>
            <Avatar src="/broken-image.jpg" />
          </div>
          <div style={{ marginLeft: "7px", marginTop: "-10px" }}>
            <h4>{item.collaborator}</h4>
          </div>
          <div style={{ marginTop: "-3px" }}>
            <IconButton
              onClick={(data) => {
                console.log("collabs", item.collaborator);

                this.handleRemoveCollab(data, item.collaborator);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });

    let item = {
      title: this.state.title,
      description: this.state.description,
      id: this.state.id,
      isArchived: this.state.isArchived,
      isPinned: this.state.isPinned,
      isTrashed: this.state.isTrashed,
      color: this.state.color,
    };

    const color1 = this.state.manycolor.map((color) => {
      return (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 100 }}
          title={color.name}
        >
          <IconButton
            style={{
              background: color.colorCode,
              margin: "2%",
            }}
            value={color.colorCode}
            onClick={this.changeNoteColor}
          />
        </Tooltip>
      );
    });
    return (
      <Card
        id={!this.state.view ? "card_decor2" : "card_decor6"}
        style={{ backgroundColor: this.state.color }}
      >
        <div id="pin-inputbase-getnotes">
          <InputBase
            className="inputbase"
            id="style-inpbase"
            multiline
            disabled
            spellCheck={false}
            placeholder="Title...."
            value={this.state.title}
            onChange={this.onChangeTitle}
            onClick={this.handleDialogOpen}
          />
          {!this.state.isPinned ? (
            <div className="pinunpin-align">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 100 }}
                title="Pin"
                arrow
              >
                <IconButton aria-label="Pin">
                  <img
                    style={{
                      height: "0.5cm",
                      width: "0.5cm",
                      opacity: "0.65",
                    }}
                    src={Pin}
                    onClick={this.handleIsPinned}
                  />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div className="pinunpin-align">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 100 }}
                title="Unpin"
                arrow
              >
                <IconButton aria-label="Unpin">
                  <img
                    style={{
                      height: "0.5cm",
                      width: "0.5cm",
                      opacity: "0.65",
                    }}
                    src={Unpin}
                    onClick={this.handleIsUnpinned}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        <div id="pin-inputbase-getnotes">
          <InputBase
            id="style-inpbase"
            multiline
            disabled
            spellCheck={false}
            placeholder="Description...."
            value={this.state.description}
            onChange={this.onChangeDescription}
            onClick={this.handleDialogOpen}
          />
        </div>
        <Toolbar id="label_chip">
          {this.state.remState !== null ? (
            <div className="chip-style">
              <Chip
                icon={<AccessTimeIcon />}
                label={rem}
                onDelete={this.handleReminderDelete}
                onClick={this.handleReminderClick}
              />
            </div>
          ) : null}
          {displaylabels}
          {displaycollabs}
        </Toolbar>
        <MuiThemeProvider>
          <div>
            <Toolbar id="note-buttons">
              <div style={{ display: "flex" }}>
                <div id="tooltip-style">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Reminder"
                    arrow
                  >
                    <IconButton
                      aria-label="Reminder"
                      onClick={this.handleReminderClick}
                    >
                      <AddAlertIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div id="tooltip-style">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Collaborator"
                    arrow
                  >
                    <IconButton
                      aria-label="Collaborator"
                      onClick={this.handleCollabOpen}
                    >
                      <PersonAddIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div id="tooltip-style">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Color"
                    disableHoverListener={this.state.hoverColorTooltip}
                    arrow
                  >
                    <IconButton aria-label="Color">
                      <PaletteOutlinedIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.changeColor}
                      />
                      <Menu
                        id="simple-menu"
                        open={this.state.colorOpen}
                        anchorEl={this.state.colorAnchor}
                        onClose={this.closeColorBox}
                        transformOrigin={{
                          vertical: "right",
                          horizontal: "right",
                        }}
                      >
                        <div id="color-align">{color1}</div>
                      </Menu>
                    </IconButton>
                  </Tooltip>
                </div>
                {this.state.fromArchive ? (
                  <div id="tooltip-style">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Unarchive"
                      arrow
                    >
                      <IconButton aria-label="Unarchive">
                        <UnarchiveOutlinedIcon
                          style={{ fontSize: "20px" }}
                          onClick={this.handleIsUnArchived}
                        />
                        <Snackbar
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          open={this.state.openSnack}
                          autoHideDuration={4000}
                          onClose={this.handleClose}
                          message={this.state.archivemsg}
                          action={
                            <React.Fragment>
                              <div>
                                <IconButton
                                  size="small"
                                  aria-label="close"
                                  color="inherit"
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </div>
                            </React.Fragment>
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div id="tooltip-style">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Archive"
                      arrow
                    >
                      <IconButton aria-label="Archive">
                        <ArchiveOutlinedIcon
                          style={{ fontSize: "20px" }}
                          onClick={this.handleIsArchived}
                        />
                        <Snackbar
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          open={this.state.openSnack}
                          autoHideDuration={4000}
                          onClose={this.handleClose}
                          message={this.state.archivemsg}
                          action={
                            <React.Fragment>
                              <div>
                                <IconButton
                                  size="small"
                                  aria-label="close"
                                  color="inherit"
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </div>
                            </React.Fragment>
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
                <div id="tooltip-style">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="More"
                    disableHoverListener={this.state.hoverMoreTooltip}
                    arrow
                  >
                    <IconButton aria-label="More">
                      <MoreVertTwoToneIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.changeLabel}
                      />
                      <div>
                        <Popover
                          id="label-menu"
                          open={this.state.menu}
                          anchorEl={this.state.labelAnchor}
                          onClick={this.handleMenuClickAway}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <MenuItem onClick={this.handleLabelMenuOpen}>
                            Add label
                          </MenuItem>
                          <MenuItem onClick={this.handleDeleteNote}>
                            Delete note
                          </MenuItem>
                        </Popover>
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </div>
        </MuiThemeProvider>
        <Popover
          id="addlabel-menu"
          open={this.state.labelMenu}
          anchorEl={this.state.labelAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={this.handleLabelMenuClickAway}
        >
          <div id="labelnote_menu">Label Note</div>
          <MenuItem>
            <Toolbar id="createlabelnote_field">
              <div style={{ display: "flex" }}>
                <div className="cancel_labeltext">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Cancel"
                    placement="left"
                    arrow
                  >
                    <IconButton aria-label="Cancel">
                      <CloseOutlinedIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.handleCancel}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="input_createlabelnote">
                  <Input
                    placeholder="Add new label"
                    inputProps={{ "aria-label": "description" }}
                    spellCheck={false}
                    value={this.state.labelName}
                    onChange={this.onChangeLabelName}
                  />
                </div>
                <div className="done_icon">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Create label"
                    placement="right"
                    arrow
                  >
                    <IconButton aria-label="Create label">
                      <DoneIcon onClick={this.handleDoneClick} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </MenuItem>
          {label}
        </Popover>
        <Dialog open={this.state.openDialog}>
          <div className="note-button">
            <Card
              id="card_decor5"
              style={{
                backgroundColor: this.state.color,
              }}
            >
              <div id="pin-inputbase">
                <InputBase
                  id="style-inpbase"
                  multiline
                  spellCheck={false}
                  placeholder="Title...."
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />

                {!this.state.isPinned ? (
                  <div className="pinunpin-align">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Pin"
                      arrow
                    >
                      <IconButton aria-label="Pin">
                        <img
                          style={{
                            height: "0.54cm",
                            width: "0.54cm",
                            opacity: "0.65",
                          }}
                          src={Pin}
                          onClick={this.handleDialogPinUnpin}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="pinunpin-align">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Unpin"
                      arrow
                    >
                      <IconButton aria-label="Unpin">
                        <img
                          style={{
                            height: "0.54cm",
                            width: "0.54cm",
                            opacity: "0.65",
                          }}
                          src={Unpin}
                          onClick={this.handleDialogPinUnpin}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div id="pin-inputbase">
                <InputBase
                  id="style-inpbase"
                  multiline
                  spellCheck={false}
                  placeholder="Description...."
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <Toolbar id="display_labels">
                {this.state.remState !== null ? (
                  <div className="chip-style">
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={rem}
                      onDelete={this.handleReminderDelete}
                      onClick={this.handleReminderClick}
                    />
                  </div>
                ) : null}
                {displaylabels}
                {displaycollabs}
              </Toolbar>

              <MuiThemeProvider>
                <div>
                  <Toolbar id="toolbaricons">
                    <div style={{ display: "flex" }}>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Reminder"
                          arrow
                        >
                          <IconButton
                            aria-label="Reminder"
                            className="iconButtons"
                            onClick={this.handleReminderClick}
                          >
                            <AddAlertIcon style={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Collaborator"
                          arrow
                        >
                          <IconButton
                            aria-label="Collaborator"
                            onClick={this.handleCollabOpen}
                          >
                            <PersonAddIcon style={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div>
                        {this.state.fromArchive ? (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 100 }}
                            title="Unarchive"
                            arrow
                          >
                            <IconButton aria-label="Unarchive">
                              <UnarchiveOutlinedIcon
                                style={{ fontSize: "20px" }}
                                onClick={this.handleIsUnArchived}
                              />
                              <Snackbar
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                open={this.state.open}
                                autoHideDuration={4000}
                                onClose={this.handleClose}
                                message={this.state.archivemsg}
                                action={
                                  <React.Fragment>
                                    <div>
                                      <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={this.handleClose}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                  </React.Fragment>
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 100 }}
                            title="Archive"
                            arrow
                          >
                            <IconButton aria-label="Archive">
                              <ArchiveOutlinedIcon
                                style={{ fontSize: "20px" }}
                                onClick={this.handleIsArchived}
                              />
                              <Snackbar
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                open={this.state.open}
                                autoHideDuration={4000}
                                onClose={this.handleClose}
                                message={this.state.archivemsg}
                                action={
                                  <React.Fragment>
                                    <div>
                                      <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={this.handleClose}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                  </React.Fragment>
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Color"
                          disableHoverListener={this.state.hoverColorTooltip}
                          arrow
                        >
                          <IconButton aria-label="Color">
                            <PaletteOutlinedIcon
                              style={{ fontSize: "20px" }}
                              onClick={this.changeColor}
                            />
                            <Menu
                              id="simple-menu"
                              open={this.state.colorOpen}
                              anchorEl={this.state.colorAnchor}
                              onClose={this.closeColorBox}
                              transformOrigin={{
                                vertical: "right",
                                horizontal: "right",
                              }}
                            >
                              <div id="color-align">{color1}</div>
                            </Menu>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="More"
                          disableHoverListener={this.state.hoverMoreTooltip}
                          arrow
                        >
                          <IconButton aria-label="More">
                            <MoreVertTwoToneIcon
                              style={{ fontSize: "20px" }}
                              onClick={this.changeLabel}
                            />
                            <div>
                              <Popover
                                id="label-menu"
                                open={this.state.menu}
                                anchorEl={this.state.labelAnchor}
                                onClick={this.handleMenuClickAway}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                              >
                                <MenuItem onClick={this.handleLabelMenuOpen}>
                                  Add label
                                </MenuItem>
                                <MenuItem onClick={this.handleDeleteNote}>
                                  Delete note
                                </MenuItem>
                              </Popover>
                            </div>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div id="close_button">
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 100 }}
                        title={saveclose}
                        arrow
                      >
                        <Button onClick={this.onCloseDialog}>Close</Button>
                      </Tooltip>
                    </div>
                  </Toolbar>
                </div>
              </MuiThemeProvider>
            </Card>
          </div>
        </Dialog>

        {/* <DialogCard
          openDialog={this.state.openDialog}
          handleDialogClose={this.handleDialogClose}
          data={item}
          getNote={this.props.getNote}
        /> */}
        <Dialog open={this.state.collabOpen}>
          <Card id="card_decor_collab">
            <Toolbar>
              <h3>Collaborators</h3>
            </Toolbar>
            <Divider />
            <div className="collab-owner">
              <div style={{ marginLeft: "23px", marginTop: "10px" }}>
                <Avatar src={this.state.profilePicture} />
              </div>
              <div style={{ marginLeft: "7px" }}>
                <h4>{owner}(owner)</h4>
              </div>
            </div>
            {collabs}
            <div className="collab-new">
              <div>
                <IconButton>
                  <PersonAddTwoToneIcon fontSize="15px" />
                </IconButton>
              </div>
              <div
                style={{
                  paddingTop: "6px",
                }}
              >
                <Input
                  required="true"
                  error={this.state.err1}
                  placeholder="Email to share with"
                  spellCheck={false}
                  value={this.state.collabName}
                  onChange={this.onChangeCollabName}
                  helperText={this.helpercollabmethod()}
                />
              </div>
              <div>
                <IconButton disabled={this.state.disable}>
                  <DoneIcon onClick={this.handleCollabDoneClick} />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className="collab-cancelsavebutton">
              <div style={{ marginRight: "5%" }}>
                <Button variant="contained" onClick={this.handleCollabCancel}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={this.handleCollabSave}>
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </Dialog>
        <Popover
          id="label-menu"
          open={this.state.reminderMenu}
          anchorEl={this.state.reminderAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={this.handleMenuClickAway}
        >
          <Card id="reminder-card">
            <Toolbar id="createlabelnote_field">
              <Typography style={{ fontWeight: "bolder" }}>
                Reminders
              </Typography>
            </Toolbar>
            <Divider />
            <Toolbar>
              <div style={{ marginLeft: "-11px" }}>
                <form>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    value={this.state.selectedDate}
                    defaultValue={this.state.selectedDate}
                    onChange={this.handleReminder}
                  />
                </form>
              </div>
            </Toolbar>
            <Toolbar id="createlabelnote_field">
              <div className="rem-save">
                <Button onClick={this.handleSaveReminder}>save</Button>
              </div>
            </Toolbar>
          </Card>
        </Popover>
      </Card>
    );
  }
}

export default GetNotes;
