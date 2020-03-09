import React, { Component, PureComponent } from "react";
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
  ReactFragment
} from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
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
import Controller from "../Controller/UserController";
import DialogCardArchive from "../Components/DialogCardArchive";
class GetArchiveNotes extends PureComponent {
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

      colorAnchor: null,
      openSnack: false,
      open: false,
      openDialog: false,
      menu: false,
      labelAnchor: null,

      manycolor: [
        { name: "default", colorCode: "#FDFEFE" },
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
        { name: "Brown", colorCode: "#bcaaa4" }
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
      color: props.data.color
    });
  }

  handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    await this.setState({ openSnack: false });
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

  changeLabel = event => {
    this.setState({
      menu: true,
      labelAnchor: event.currentTarget
    })
  }


  closeColorBox = () => {
    this.setState({
      colorOpen: false,
      colorAnchor: null
    });
  };
  changeColor = event => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget
    });
  };
  changeNoteColor = async event => {
    await this.setState({ color: event.target.value });
    await NoteController.colornote(this.state.id, this.state.color).then(
      res => {
        if (res.status === 200) {
          console.log("Color set Successfully");
        }
      }
    );
    this.props.getNote();
  };

  handleIsPinned = async () => {
    await this.setState({ isPinned: true });
    await this.setState({
      isPinned: true,
      isArchived: false,
      archivemsg: "Note Unarchived and Pinned",
      openSnack: true
    });
    await NoteController.pinnote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Successfully Unarchived and pinned");
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
    await this.setState({
      isPinned: false,
      isArchived: false,
      archivemsg: "Note Unarchived ",
      openSnack: true
    });

    await NoteController.archivenote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Successfully Unarchived");
      }
    });
    this.props.getNote();
  };

  render() {
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
        <div>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 100 }}
            title={color.name}
          >
            <IconButton
              style={{ background: color.colorCode }}
              value={color.colorCode}
              onClick={this.changeNoteColor}
            />
          </Tooltip>
        </div>
      );
    });
    return (
      <Card id="card_decor2" style={{ backgroundColor: this.state.color }}>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <InputBase
                className="inputbase"
                style={{
                  marginTop: "9px",
                  paddingLeft: "15px",
                  paddingRight: "29px",
                  fontWeight: "bolder",
                  color: "#616161"
                }}
                multiline
                disabled
                spellCheck={false}
                placeholder="Title...."
                value={this.state.title}
                onChange={this.onChangeTitle}
                onClick={this.handleDialogOpen}
              />
            </div>
            {!this.state.isPinned ? (
              <div className={"pin_getnotes"}>
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
                        width: "0.5cm"
                      }}
                      src={Pin}
                      onClick={this.handleIsPinned}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
                <div className={"pin_getnotes"}>
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
                          width: "0.5cm"
                        }}
                        src={Unpin}
                        onClick={this.handleIsUnpinned}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
          </div>

          <InputBase
            className="inputbase"
            style={{
              paddingLeft: "15px",
              paddingRight: "26px",
              color: "#616161"
            }}
            multiline
            disabled
            spellCheck={false}
            placeholder="Description...."
            value={this.state.description}
            onChange={this.onChangeDescription}
            onClick={this.handleDialogOpen}
          />
        </div>

        <MuiThemeProvider>
          <div>
            <Toolbar>
              <div className="buttons" style={{ display: "flex" }}>
                <div style={{ marginLeft: "9px" }}>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Reminder"
                    arrow
                  >
                    <IconButton aria-label="Reminder" className="iconButtons">
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
                    title="Color"
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
                        <div
                          style={{
                            display: "flex",
                            marginBottom: "15px",
                            marginLeft: "58px"
                          }}
                        >
                          {color1}
                        </div>
                      </Menu>
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Unarchive"
                    arrow
                  >
                    <IconButton aria-label="UnArchive">
                      <UnarchiveOutlinedIcon
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

                <div className="menu_getnotes">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="More"
                    arrow
                  >
                    <IconButton aria-label="More">
                      <MoreVertTwoToneIcon style={{ fontSize: "20px" }} onClick={this.changeLabel} />
                      <div>
                        <Menu
                          id="label-menu"
                          open={this.state.menu}
                          anchorEl={this.state.labelAnchor}
                          transformOrigin={{
                            vertical: "right",
                            horizontal: "right"
                          }}

                        >
                          <MenuItem onClick={this.MenuClose}>
                            Add label
                          </MenuItem>
                        </Menu>
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              {/* <div className="CloseButton"> */}
              {/* onClick={this.handleClickClose }

                                    } */}

              {/* </div> */}
            </Toolbar>
          </div>
        </MuiThemeProvider>

        <DialogCardArchive
          openDialog={this.state.openDialog}
          handleDialogClose={this.handleDialogClose}
          data={item}
          getNote={this.props.getNote}
        />
      </Card>
    );
  }
}

export default GetArchiveNotes;
