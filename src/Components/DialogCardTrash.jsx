import React, { Component } from "react";
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
  Card
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
import "../App.css";
import "../Notes.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import NoteController from "../Controller/NoteController";
import Controller from "../Controller/UserController";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

class DialogCardTrash extends Component {


  constructor(props) {
    super(props)

    this.state = {
      title: this.props.data.title,
      description: this.props.data.description,
      id: this.props.data.id,
      isArchived: this.props.data.isArchived,
      isPinned: this.props.data.isPinned,
      isTrashed: this.props.data.isTrashed,
      color: this.props.data.color,
    }
  }

  handleDialogClickaway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.props.handleDialogClose();
  };

  render() {
    return (
      <div className="dialog_note">
        <Dialog open={this.props.openDialog} onClose={this.handleDialogClickaway}>
          <div>
            <Card id="card_decor1" style={{ backgroundColor: this.state.color }}>
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
                          title="Delete forever"
                          arrow
                        >
                          <IconButton aria-label="Delete" className="iconButtons">
                            <DeleteForeverIcon style={{ fontSize: "20px" }} onClick={this.props.handleDeleteForever} />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Restore"
                          arrow
                        >
                          <IconButton aria-label="Restore">
                            <RestoreFromTrashIcon style={{ fontSize: "20px" }} onClick={this.props.handleRestore} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </Toolbar>
                </div>
              </MuiThemeProvider>
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default DialogCardTrash;
