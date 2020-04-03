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
  Avatar
} from "@material-ui/core";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
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
import DialogCard from "../Components/DialogCard";
import GetLabelsInNoteMenu from "../Components/GetLabelsInNoteMenu";

const saveclose = "Save & Close";
let array = [];
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
      ],

      defaultColour: "#FDFEFE",
      colorOpen: false,
      opencolourBox: false
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
      obj3: props.obj3,
      allLabels: props.data.labels
    });
  }
  componentDidMount(props) {}

  handleLabel = async data => {
    for (let index = 0; index < this.state.allLabels.length; index++) {
      array.push(this.state.allLabels[index]);
    }

    array.push(data);
    await this.setState({
      allLabels: array,
      labelpresent: true
    });
  };
  handleLabelRemove = async data => {
    for (let index = 0; index < this.state.allLabels.length; index++) {
      array.push(this.state.allLabels[index]);
    }
    for (let index = 0; index < array.length; index++) {
      if (array[index].labelname === data.labelname) {
        array.splice(index, 1);
      }
    }
    await this.setState({
      allLabels: array
    });
    if (this.state.allLabels.length === 0) {
      this.setState({ labelpresent: false });
    }
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

      await NoteController.addlabeltonote(
        labelDetails,
        this.props.data.id
      ).then(res => {
        if (res.status === 200) {
          console.log("Label added to the note successfully");
        }
      });
    }
    await this.setState({ labelName: "" });
    this.props.getLabel();
    this.props.getNote();
  };
  onChangeLabelName = async event => {
    await this.setState({ labelName: event.target.value });
    console.log(this.state.labelName);
  };
  handleCancel = async () => {
    await this.setState({ labelName: "" });
  };
  handleLabelMenuOpen = () => {
    this.setState({
      labelMenu: true,
      menu: false,
      hoverMoreTooltip: true
    });
  };

  handleMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({
      menu: false,
      hoverMoreTooltip: false
    });
  };

  handleLabelMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({
      labelMenu: false,
      hoverMoreTooltip: false
    });
  };

  handleDeleteNote = async () => {
    await this.setState({ isTrashed: true });
    await NoteController.deletenote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Note Deleted Successfully");
      }
    });
    this.props.getNote();
  };

  MenuClose = () => {
    this.setState({ menu: false });
  };

  changeLabel = event => {
    this.setState({
      menu: true,
      labelAnchor: event.currentTarget,
      hoverMoreTooltip: true
    });
  };

  handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    await this.setState({ openSnack: false });
  };

  handleTooltipClose = async => {
    this.setState({
      openTooltip: false
    });
  };
  handleTooltipOpen = async => {
    this.setState({
      openTooltip: true
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

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };
  handleDialogClose = data => {
    this.setState({ openDialog: false });
  };

  closeColorBox = () => {
    this.setState({
      colorOpen: false,
      colorAnchor: null,
      hoverColorTooltip: false
    });
  };
  changeColor = event => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
      hoverColorTooltip: true
    });
  };
  changeNoteColor = async event => {
    await this.setState({
      color: event.target.value,
      openTooltip: false,
      hoverColorTooltip: false
    });

    await NoteController.colornote(this.state.id, this.state.color).then(
      res => {
        if (res.status === 200) {
          console.log("Color set Successfully");
        }
      }
    );
    this.props.getNote();
  };
  handleDeleteLabel = async x => {
    await NoteController.deletelabelfornote(this.props.data.id, x).then(res => {
      if (res.status === 200) {
        console.log("Label deleted for the note successfully");
      }
    });
    this.props.getNote();
  };

  handleIsPinned = async () => {
    await this.setState({ isPinned: true });
    await NoteController.pinnote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Successfully pinned");
      }
    });

    this.props.getNote();
  };

  handleIsUnpinned = async () => {
    await this.setState({ isPinned: false });
    await NoteController.pinnote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Successfully Unpinned");
      }
    });
    this.props.getNote();
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
        archivemsg: "Note Unpinned and Archived",
        openSnack: true
      });

      await NoteController.archivenote(this.state.id).then(res => {
        if (res.status === 200) {
          console.log("Successfully unpinned and archived");
        }
      });
      this.props.getNote();
    } else {
      await this.setState({
        isArchived: true,
        archivemsg: "Note Archived",
        openSnack: true
      });
      await NoteController.archivenote(this.state.id).then(res => {
        if (res.status === 200) {
          console.log("successfully archived");
        }
      });
      this.props.getNote();
    }
  };

  render() {
    const label = this.state.obj3.map(item => {
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
      displaylabels = this.state.allLabels.map(el => {
        console.log(el.labelname);
        let x;
        this.state.obj3.map(elem => {
          if (elem.labelname === el.labelname) {
            x = elem.id;
          }
        });
        return (
          <div className="chip-style">
            <Chip
              label={el.labelname}
              onDelete={() => {
                NoteController.deletelabelfornote(this.props.data.id, x).then(
                  res => {
                    if (res.status === 200) {
                      console.log("Label deleted for the note successfully");
                    }
                  }
                );
                this.props.getNote();
              }}
              deleteIcon={
                <Tooltip title="Remove Label" placement="top">
                  <CancelTwoToneIcon />
                </Tooltip>
              }
            />
          </div>
        );
      });
    }

    let item = {
      title: this.state.title,
      description: this.state.description,
      id: this.state.id,
      isArchived: this.state.isArchived,
      isPinned: this.state.isPinned,
      isTrashed: this.state.isTrashed,
      color: this.state.color
    };

    const color1 = this.state.manycolor.map(color => {
      return (
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
      );
    });
    return (
      <Card id="card_decor2" style={{ backgroundColor: this.state.color }}>
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
                    height: "0.5cm",
                    width: "0.5cm",
                    opacity: "0.65"
                  }}
                  src={Unpin}
                  onClick={this.handleIsUnpinned}
                />
              </IconButton>
            </Tooltip>
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
        <Toolbar id="label_chip">{displaylabels}</Toolbar>
        <MuiThemeProvider>
          <div>
            <Toolbar id="note-buttons">
              <div id="tooltip-style">
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 100 }}
                  title="Reminder"
                  arrow
                >
                  <IconButton aria-label="Reminder">
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
                  <IconButton aria-label="Collaborator">
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
                        horizontal: "right"
                      }}
                    >
                      <div className="color-align">{color1}</div>
                    </Menu>
                  </IconButton>
                </Tooltip>
              </div>
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
                        horizontal: "center"
                      }}
                      open={this.state.openSnack}
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
                          horizontal: "center"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center"
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
              {/* <div className="CloseButton"> */}
              {/* onClick={this.handleClickClose }

                                    } */}

              {/* </div> */}
            </Toolbar>
          </div>
        </MuiThemeProvider>
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
          onClose={this.handleLabelMenuClickAway}
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
        <DialogCard
          openDialog={this.state.openDialog}
          handleDialogClose={this.handleDialogClose}
          data={item}
          getNote={this.props.getNote}
        />
      </Card>
    );
  }
}

export default GetNotes;
