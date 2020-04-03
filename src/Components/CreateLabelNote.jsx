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
  Popover
} from "@material-ui/core";
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
class CreateLabelNote extends Component {
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
      labelpresent: false,
      collabpresent: false,

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
        { name: "White", colorCode: "#FDFEFE" }
      ]
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ obj3: props.obj3 });
  }

  componentDidMount() {
    this.noteWithLabel();
  }
  noteWithLabel = async () => {
    array.push(this.props.labelName);
    await this.setState({ allLabels: array, labelpresent: true });
  };
  handleLabel = async data => {
    array.push(data);
    await this.setState({
      allLabels: array,
      labelpresent: true
    });
    console.log(this.state.allLabels);
    console.log(array, "poter potter");
  };
  handleLabelRemove = async data => {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === data) {
        array.splice(index, 1);
      }
    }
    // array.pop(data)
    await this.setState({
      allLabels: array
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
      hoverMoreTooltip: false
    });
  };
  onChangeLabelName = async event => {
    await this.setState({ labelName: event.target.value });
    console.log(this.state.labelName);
  };

  handleDoneClick = async () => {
    if (this.state.labelName !== "") {
      var labelDetails = {
        labelname: this.state.labelName
      };

      await LabelController.newlabelforuser(labelDetails).then(res => {
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
  changeLabel = event => {
    this.setState({
      menu: true,
      labelAnchor: event.currentTarget,
      hoverMoreTooltip: true
    });
  };

  handleClickOpen = async () => {
    array = [];
    array.push(this.props.labelName);
    await this.setState({
      openNote: true,
      allLabels: array
    });
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };
  onChangeDescription = event => {
    this.setState({
      description: event.target.value
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
        open: true
      });

      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        reminder: this.state.reminder,
        labelName: this.state.labelName
      };

      await Controller.takenote(noteDetails).then(res => {
        if (res.status === 200) {
          console.log("Note created successfully");
          this.state.allLabels.map(items => {
            let noteDetails = { labelname: items };
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              reso => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
          });
        }
      });
      this.props.getNote();
      array = [];
      array.push(this.props.labelName);

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
        allLabels: array,
        labelpresent: true
      });
      // for (let index = 0; index < array.length; index++) {
      //   array[index] = "";
      // }
    } else if (this.state.title !== "" || this.state.description !== "") {
      await this.setState({
        isArchived: true,
        archivemsg: "Note Archived",
        open: true
      });

      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        reminder: this.state.reminder,
        labelName: this.state.labelName
      };
      await Controller.takenote(noteDetails).then(res => {
        if (res.status === 200) {
          console.log("Note created successfully");
          this.state.allLabels.map(items => {
            let noteDetails = { labelname: items };
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              reso => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
          });
        }
      });
      this.props.getNote();
      array = [];
      array.push(this.props.labelName);
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
        allLabels: array,
        labelpresent: true
      });
      array = [];
    } else {
      this.setState({ archivemsg: "Cannot Archive" });
      this.setState({ open: true, labelpresent: false, collabpresent: false });
    }
    array = [];
  };

  changeColor = event => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
      colorTooltipOpen: true,
      hoverColorTooltip: true
    });
  };
  changeNoteColor = event => {
    this.setState({
      color: event.target.value,
      hoverColorTooltip: false
    });
  };
  closeColorBox = () => {
    this.setState({
      colorOpen: false,
      colorAnchor: null,
      colorTooltipOpen: false,
      hoverColorTooltip: false
    });
  };

  handleLabelMenuOpen = () => {
    this.setState({
      labelMenu: true,
      menu: false,
      hoverMoreTooltip: true
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
      array = [];
      array.push(this.props.labelName);
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
        allLabels: array,
        labelpresent: true,
        collabpresent: false
      });
    } else {
      var noteDetails = {
        title: this.state.title,
        takeanote: this.state.description,
        createdtime: this.state.createdTime,
        trashed: this.state.isTrashed,
        archived: this.state.isArchived,
        pinned: this.state.isPinned,
        color: this.state.color,
        reminder: this.state.reminder,
        labelName: this.state.labelName
      };

      await Controller.takenote(noteDetails).then(res => {
        console.log("hiii...", res);
        if (res.status === 200) {
          console.log(res.data.message);
          console.log("Note created successfully");
          this.state.allLabels.map(items => {
            let noteDetails = { labelname: items };
            console.log(noteDetails.labelname, "hello pppp");
            console.log(res.data.object.id, "jsssssssssss");
            NoteController.addlabeltonote(noteDetails, res.data.object.id).then(
              reso => {
                if (reso.status === 200) {
                  console.log("Label added to note");
                }
              }
            );
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
        labelpresent: false
      });

      array = [];
    }

    this.props.getNote();
  };

  render() {
    const label = this.state.obj3.map(item => {
      console.log(this.state.allLabels, "all labels");
      if (this.state.allLabels.length !== 0) {
        for (let i = 0; i < this.state.allLabels.length; i++) {
          console.log(this.state.allLabels[i], "labels");
          console.log(item, "item");

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
    let displaylabels;
    if (this.state.allLabels.length !== 0) {
      console.log(this.state.allLabels, "all Labels");
      displaylabels = this.state.allLabels.map(el => {
        console.log(el);
        return (
          <div>
            <Chip label={el} onDelete={this.handleDeleteLabelInNote} />
          </div>
        );
      });
    }
    const color1 = this.state.manycolor.map(color => {
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
                margin: "2%"
              }}
              value={color.colorCode}
              onClick={this.changeNoteColor}
            />
          </Tooltip>
        </div>
      );
    });

    return (
      <div
        style={{
          marginTop: "55px"
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
                backgroundColor: this.state.color
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
                          opacity: "0.65"
                        }}
                        src={Pin}
                        onClick={this.handleIsPinned}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
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
                          opacity: "0.65"
                        }}
                        src={Unpin}
                        onClick={this.handleIsPinned}
                      />
                    </IconButton>
                  </Tooltip>
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

              {this.state.labelpresent || this.state.collabpresent ? (
                <Toolbar id="display_labels">{displaylabels}</Toolbar>
              ) : null}
              <MuiThemeProvider>
                <div>
                  <Toolbar id="toolbaricons">
                    <div className="buttons" style={{ display: "flex" }}>
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
                          <IconButton aria-label="Collaborator">
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
                            <Snackbar
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                              }}
                              open={this.state.open}
                              autoHideDuration={4000}
                              onClose={this.handleClose}
                              message={this.state.archivemsg}
                              action={
                                <React.Fragment>
                                  <div
                                    style={{
                                      paddingBottom: "17px",
                                      marginRight: "-25px"
                                    }}
                                  >
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
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Color"
                          placement="right"
                          disableHoverListener={this.state.hoverColorTooltip}
                          // onMouseLeave={() => {
                          //   this.setState({ openTooltip: false })

                          // }}
                          // onMouseOutCapture={() => {
                          //   this.setState({ openTooltip: false })

                          // }}
                          // onMouseOverCapture={() => {
                          //   this.setState({ openTooltip: false })

                          // }}

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
                                horizontal: "right"
                              }}
                              className="colormenu"
                            >
                              <div className="color-align">{color1}</div>
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
                                  horizontal: "center"
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center"
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
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          onClose={this.handleMenuClickAway}
        >
          <div id="labelnote_menu" style={{}}>
            Label Note
          </div>
          <MenuItem>
            <Toolbar id="createlabelnote_field">
              <div
                className="buttons"
                style={{ display: "flex", marginLeft: "1px" }}
              >
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
      </div>
    );
  }
}

export default CreateLabelNote;

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
