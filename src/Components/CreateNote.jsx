import React, { Component, Fragment } from "react";
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
  Typography,
  Popover,
  Divider,
  Avatar,
  TextField,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Button from "@material-ui/core/Button";
import MoreVertTwoToneIcon from "@material-ui/icons/MoreVertTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import Pin from "../IMG/pin.svg";
import Unpin from "../IMG/unpin.svg";
import Controller from "../Controller/UserController";
import LabelController from "../Controller/LabelController";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "../App.css";
import "../Notes.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import GetLabelsInMenu from "../Components/GetLabelsInMenu";
import Chip from "@material-ui/core/Chip";
import NoteController from "../Controller/NoteController";

const saveclose = "Save & Close";
const bgcolor = "";
let array = [];
let arrcollab1 = [];
let rem = [];

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj3: this.props.obj3,
      open: false,
      menu: false,
      openNote: false,
      openTooltip: false,
      title: "",
      description: "",
      createNote: false,
      isArchived: false,
      archivemsg: "",
      isPinned: false,
      reminder: "",
      labelName: "",
      createdTime: "",
      checkedLabel: false,
      menu: false,
      labelMenu: false,
      labelAnchor: null,
      colorTooltipOpen: false,
      colorAnchor: null,
      colorOpen: false,
      hoverColorTooltip: false,
      hoverMoreTooltip: false,
      color: "#FDFEFE",
      getNote: this.props.getNote,
      allLabels: [],
      collaborators1: [],
      collaborators: [],
      labelpresent: false,
      collabpresent: false,
      collabOpen: false,
      disable: true,
      collabName: "",
      err1: false,
      reminderMenu: false,
      reminderAnchor: null,
      selectedDate: "",
      remState: [],
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
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ obj3: props.obj3, profilePicture: props.profilePicture });
  }

  handleLabel = async (data) => {
    array.push(data);
    await this.setState({
      allLabels: array,
      labelpresent: true,
    });
    console.log(this.state.allLabels);
    console.log(array, "poter potter");
  };
  handleLabelRemove = async (data) => {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === data) {
        array.splice(index, 1);
      }
    }
    // array.pop(data)
    await this.setState({
      allLabels: array,
    });
    console.log(this.state.allLabels);
    if (this.state.allLabels.length === 0) {
      this.setState({ labelpresent: false });
    }
  };
  handleMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    await this.setState({
      menu: false,

      labelMenu: false,
      hoverColorTooltip: false,
      hoverMoreTooltip: false,
      reminderMenu: false,
      selectedDate: "",
    });
  };
  onChangeLabelName = async (event) => {
    await this.setState({ labelName: event.target.value });
    console.log(this.state.labelName);
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
    }
    await this.setState({ labelName: "" });
    this.props.getLabel();
  };

  handleCancel = async () => {
    console.log("bef", this.state.labelName);
    await this.setState({ labelName: "" });
    console.log("aft", this.state.labelName);
  };

  MenuClose = () => {
    this.setState({ menu: false });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  changeLabel = (event) => {
    this.setState({
      menu: true,
      labelAnchor: event.currentTarget,
      hoverMoreTooltip: true,
    });
  };

  handleClickOpen = () => {
    this.setState({
      openNote: true,
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

  handleIsPinned = () => {
    this.setState({ isPinned: !this.state.isPinned });
  };

  handleIsArchived = async () => {
    if (
      (this.state.title !== " " || this.state.description !== " ") &&
      this.state.isPinned === true
    ) {
      await this.setState({
        isPinned: false,
        isArchived: true,
        archivemsg: "Note Unpinned and Archived",
        open: true,
      });

      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };

      await Controller.takenote(noteDetails).then((res) => {
        if (res.status === 200) {
          console.log("Note created successfully");
          this.state.allLabels.map((items) => {
            let noteDetails = { labelname: items };
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              (reso) => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
          });
          this.state.collaborators.map((items) => {
            let collabDetails = {
              noteId: res.data.object.id,
              collaborator: items,
            };
            NoteController.addcollabtonote(collabDetails).then((resp) => {
              if (resp.status === 200) {
                console.log("Collaborator added to note");
              }
            });
          });
        }
      });
      this.props.getNote();
      await this.setState({
        title: "",
        description: "",
        createNote: false,
        isArchived: false,
        isPinned: false,
        color: "#FDFEFE",
        reminder: "",
        labelName: "",
        createdTime: "",
        openNote: false,
        allLabels: [],
        labelpresent: false,
        collaborators: [],
        selectedDate: "",
        remState: [],
      });
      // for (let index = 0; index < array.length; index++) {
      //   array[index] = "";
      // }
      array = [];
      arrcollab1 = [];
      rem = [];
    } else if (this.state.title !== "" || this.state.description !== "") {
      await this.setState({
        isArchived: true,
        archivemsg: "Note Archived",
        open: true,
      });

      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };
      await Controller.takenote(noteDetails).then((res) => {
        if (res.status === 200) {
          console.log("Note created successfully");
          this.state.allLabels.map((items) => {
            let noteDetails = { labelname: items };
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              (reso) => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
          });
          this.state.collaborators.map((items) => {
            let collabDetails = {
              noteId: res.data.object.id,
              collaborator: items,
            };
            NoteController.addcollabtonote(collabDetails).then((resp) => {
              if (resp.status === 200) {
                console.log("Collaborator added to note");
              }
            });
          });
        }
      });
      this.props.getNote();
      await this.setState({
        title: "",
        description: "",
        createNote: false,
        isArchived: false,
        isPinned: false,
        color: "#FDFEFE",
        reminder: "",
        labelName: "",
        openNote: false,
        createdTime: "",
        allLabels: [],
        labelpresent: false,
        selectedDate: "",
        remState: [],
      });
      array = [];
      arrcollab1 = [];
      rem = [];
    } else {
      this.setState({ archivemsg: "Cannot Archive" });
      this.setState({ open: true, labelpresent: false, collabpresent: false });
    }
    array = [];
    arrcollab1 = [];
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
        reminderMenu: false,
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
      if (rem.length !== 0) {
        rem = [];
        rem.push(remVal);
      } else {
        rem.push(remVal);
      }
      await this.setState({
        remState: rem,
        reminderMenu: false,
      });
    }
  };

  handleReminderDelete = async () => {
    rem = [];
    await this.setState({
      remState: rem,
      selectedDate: "",
    });
  };

  handleCollabOpen = async () => {
    this.setState({ collabOpen: true });
  };
  //bro when i m creating reminders im getting problem
  //if first i m adding reminder and after that title then reminder is not going in database
  //but if first i m adding title then reminder then its going
  //ill show
  //now its adding bro
  //dont know bro how its working now
  //u see null in reminders
  //ya dat was just befor i called
  //it was not inserting
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
    await this.setState({
      collaborators1: arrcollab1,
      collabName: "",
      disable: true,
    });
  };
  handleRemoveCollab = async (data, item) => {
    let temparr = this.state.collaborators;

    for (let index = 0; index < temparr.length; index++) {
      if (item === temparr[index]) {
        temparr.splice(index, 1);

        await this.setState({ collaborators: temparr });
      }
    }
  };
  handleRemoveCollab1 = async (data, item) => {
    for (let index = 0; index < arrcollab1.length; index++) {
      if (item === arrcollab1[index]) {
        arrcollab1.splice(index, 1);
        await this.setState({
          collaborators1: arrcollab1,
        });
      }
    }
  };
  handleCollabSave = async () => {
    let tempo = this.state.collaborators;
    if (arrcollab1.length !== 0) {
      for (let index = 0; index < arrcollab1.length; index++) {
        tempo.push(arrcollab1[index]);
      }
    }
    await this.setState({
      collabOpen: false,
      collaborators: tempo,
      collaborators1: [],
    });
    arrcollab1 = [];
  };
  handleCollabCancel = async () => {
    arrcollab1 = [];
    await this.setState({
      collaborators1: arrcollab1,
      collabOpen: false,
    });
  };
  changeColor = (event) => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
      colorTooltipOpen: true,
      hoverColorTooltip: true,
    });
  };
  changeNoteColor = (event) => {
    this.setState({
      color: event.target.value,
      hoverColorTooltip: false,
    });
  };
  closeColorBox = () => {
    this.setState({
      colorOpen: false,
      colorAnchor: null,
      colorTooltipOpen: false,
      hoverColorTooltip: false,
    });
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

  MenuClose = () => {
    this.setState({ menu: false });
  };
  openMenu = () => {
    this.setState({ menu: true });
  };
  onClose = async () => {
    if (this.state.title === "" && this.state.description === "") {
      await this.setState({
        title: "",
        description: "",
        createNote: false,
        isArchived: false,
        archivemsg: "",
        isPinned: false,
        color: "#FDFEFE",
        reminder: "",
        labelName: "",
        createdTime: "",
        openNote: false,
        allLabels: [],
        labelpresent: false,
        collabpresent: false,
        collaborators: [],
        selectedDate: "",
        remState: [],
      });
      array = [];
      arrcollab1 = [];
      rem = [];
    } else {
      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };

      await Controller.takenote(noteDetails).then((res) => {
        console.log("hiii...", res);
        if (res.status === 200) {
          console.log(res.data.message);
          console.log("Note created successfully");
          this.state.allLabels.map((items) => {
            let noteDetails = { labelname: items };
            console.log(noteDetails.labelname, "hello pppp");
            console.log(res.data.object.id, "jsssssssssss");
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              (reso) => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
          });
          this.state.collaborators.map((items) => {
            let collabDetails = {
              noteId: res.data.object.id,
              collaborator: items,
            };
            NoteController.addcollabtonote(collabDetails).then((resp) => {
              if (resp.status === 200) {
                console.log("Collaborator added to note");
              }
            });
          });
        }
      });
      await this.setState({
        title: "",
        description: "",
        createNote: false,
        isArchived: false,
        archivemsg: "",
        isPinned: false,
        color: "#FDFEFE",
        reminder: "",
        labelName: "",
        createdTime: "",
        openNote: false,
        allLabels: [],
        labelpresent: false,
        collaborators: [],
        selectedDate: "",
        remState: [],
      });

      array = [];
      arrcollab1 = [];
      rem = [];
    }

    this.props.getNote();
  };

  render() {
    console.log("reminder is ::", this.state.selectedDate);
    let owner = localStorage.getItem("owner");
    const label = this.state.obj3.map((item) => {
      if (this.state.allLabels.length !== 0) {
        for (let i = 0; i < this.state.allLabels.length; i++) {
          if (this.state.allLabels[i] === item.labelname) {
            return (
              <GetLabelsInMenu
                handleLabel={this.handleLabel}
                handleLabelRemove={this.handleLabelRemove}
                getLabel={this.props.getLabel}
                item={item}
                allLabels={this.state.allLabels}
                tick={true}
              />
            );
          }
          if (i === this.state.allLabels.length - 1) {
            return (
              <GetLabelsInMenu
                handleLabel={this.handleLabel}
                handleLabelRemove={this.handleLabelRemove}
                getLabel={this.props.getLabel}
                item={item}
                allLabels={this.state.allLabels}
                tick={false}
              />
            );
          }
        }
      } else {
        return (
          <GetLabelsInMenu
            handleLabel={this.handleLabel}
            handleLabelRemove={this.handleLabelRemove}
            getLabel={this.props.getLabel}
            item={item}
            allLabels={this.state.allLabels}
            tick={false}
          />
        );
      }
    });
    let displaycollabs;
    displaycollabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-style">
          <Tooltip title={item}>
            <Avatar src="/broken-image.jpg" onClick={this.handleCollabOpen} />
          </Tooltip>
        </div>
      );
    });
    let displaycoll;
    displaycoll = this.state.collaborators1.map((item) => {
      return (
        <div className="collab-style">
          <Tooltip title={item}>
            <Avatar src="/broken-image.jpg" />
          </Tooltip>
        </div>
      );
    });
    let displaylabels;
    if (this.state.allLabels.length !== 0) {
      displaylabels = this.state.allLabels.map((el) => {
        console.log(el);
        return (
          <div className="chip-style">
            <Chip
              label={el}
              onDelete={() => {
                this.handleLabelRemove(el);
              }}
              onClick={this.handleLabelMenuOpen}
            />
          </div>
        );
      });
    }
    const color1 = this.state.manycolor.map((color) => {
      return (
        <div>
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
        </div>
      );
    });
    let collabs;
    collabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-owner">
          <div style={{ marginLeft: "23px", marginTop: "10px" }}>
            <Avatar src="/broken-image.jpg" />
          </div>
          <div style={{ marginLeft: "7px" }}>
            <h4>{item}</h4>
          </div>
          <div style={{ marginTop: "6px" }}>
            <IconButton
              onClick={(data) => {
                this.handleRemoveCollab(data, item);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });
    //bro its not getting removed
    //
    let coll;
    coll = this.state.collaborators1.map((item) => {
      return (
        <div className="collab-owner">
          <div style={{ marginLeft: "23px" }}>
            <Avatar src="/broken-image.jpg" />
          </div>
          <div style={{ marginLeft: "7px", marginTop: "-10px" }}>
            <h4>{item}</h4>
          </div>
          <div style={{ marginTop: "-3px" }}>
            <IconButton
              onClick={(data) => {
                this.handleRemoveCollab1(data, item);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });

    let reminder;
    reminder = this.state.remState.map((elem) => {
      return (
        <div className="chip-style">
          <Chip
            icon={<AccessTimeIcon />}
            label={elem}
            onDelete={this.handleReminderDelete}
            onClick={this.handleReminderClick}
          />
        </div>
      );
    });

    return (
      <div
        style={{
          marginTop: "100px",
        }}
      >
        {!this.state.openNote ? (
          <div className="note-button">
            <Card id="card_decor1">
              <MuiThemeProvider>
                <div className="inputbase_div">
                  <InputBase
                    id="inputbase"
                    multiline
                    spellCheck={true}
                    placeholder="Take a note...."
                    onClick={this.handleClickOpen}
                  />
                </div>
              </MuiThemeProvider>
            </Card>
          </div>
        ) : (
          <div className="note-button">
            <Card
              id="card_decor4"
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
                  <div className="pin-align">
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
                          onClick={this.handleIsPinned}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="pin-align">
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
                          onClick={this.handleIsPinned}
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
                {reminder}
                {displaylabels}
                {displaycollabs}
                {displaycoll}
              </Toolbar>

              <MuiThemeProvider>
                <div>
                  <Toolbar id="toolbariconsnote">
                    <div style={{ display: "flex", marginLeft: "-28px" }}>
                      <div style={{ marginLeft: "6px" }}>
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
                          </IconButton>
                        </Tooltip>
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
                                <MenuItem onClick={this.handleLabelMenuOpen}>
                                  Add label
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
                        <Button onClick={this.onClose}>Close</Button>
                      </Tooltip>
                    </div>
                    {/* <div className="CloseButton"> */}
                    {/* onClick={this.handleClickClose }

                                    } */}

                    {/* </div> */}
                  </Toolbar>
                </div>
              </MuiThemeProvider>
            </Card>
          </div>
        )}
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
          onClose={this.handleMenuClickAway}
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
                    required="true"
                    error={this.state.err1}
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
            {coll}
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
      </div>
    );
  }
}

export default CreateNote;

// const theme = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             // padding: "12px 8px 7px"

//         },
//         MuiSvgIcon: {
//             root: {
//                 // fontSize: "1.2rem"
//             }
//         }
//     }
// })

// const useStyles = createMuiTheme({
//   overrides: {
//     MuiMenu: {
//       paper: {
//         marginTop: "44px"
//       }
//     }
//   }
// })
