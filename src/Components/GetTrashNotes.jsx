import React, { Component } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
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
  Chip,
  Avatar
} from "@material-ui/core";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import "../App.css";
import "../Notes.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import NoteController from "../Controller/NoteController";
import Controller from "../Controller/UserController";
import DialogCardTrash from "../Components/DialogCardTrash";

class GetTrashNotes extends Component {
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
      openSnack: false,
      open: false,
      openDialog: false,
      menu: false,
      collaborators: this.props.data.collaborator,
      allLabels: this.props.data.labels,
      obj3: this.props.obj3
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
      collaborators: props.data.collaborator,
      allLabels: props.data.labels,
      obj3: props.obj3
    });
  }

  handleRestore = async () => {
    await this.setState({ isTrashed: false });
    await NoteController.restorenote(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Note Restored Successfully");
      }
    });
    this.props.getNote();
  };

  handleDeleteForever = async () => {
    await this.setState({ isTrashed: false });
    await NoteController.deletenoteforever(this.state.id).then(res => {
      if (res.status === 200) {
        console.log("Note Deleted Forever Successfully");
      }
    });
    this.props.getNote();
  };

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = data => {
    this.setState({ openDialog: false });
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
            <Chip label={el.labelname} />
          </div>
        );
      });
    }
    let displaycollabs;
    displaycollabs = this.state.collaborators.map(item => {
      return (
        <div className="collab-style">
          <Tooltip title={item.collaborator}>
            <Avatar src="/broken-image.jpg" />
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
          </div>
          <div>
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
          <Toolbar id="label_chip">
            {displaylabels}
            {displaycollabs}
          </Toolbar>
          <MuiThemeProvider>
            <div>
              <Toolbar>
                <div id="trash-icons">
                  <div>
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Delete forever"
                      arrow
                    >
                      <IconButton aria-label="Delete" className="iconButtons">
                        <DeleteForeverIcon
                          style={{ fontSize: "23px" }}
                          onClick={this.handleDeleteForever}
                        />
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
                        <RestoreFromTrashIcon
                          style={{ fontSize: "23px" }}
                          onClick={this.handleRestore}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Toolbar>
            </div>
          </MuiThemeProvider>
        </div>
        <DialogCardTrash
          openDialog={this.state.openDialog}
          handleDialogClose={this.handleDialogClose}
          handleRestore={this.handleRestore}
          handleDeleteForever={this.handleDeleteForever}
          data={item}
          getNote={this.props.getNote}
        />
      </Card>
    );
  }
}

export default GetTrashNotes;
