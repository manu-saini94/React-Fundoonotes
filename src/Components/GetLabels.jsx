import React, { Component, PureComponent } from "react";
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
  Card,
  CssTextField
} from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Button from "@material-ui/core/Button";
import MoreVertTwoToneIcon from "@material-ui/icons/MoreVertTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Pin from "../IMG/pin.svg";
import Unpin from "../IMG/unpin.svg";
import "../App.css";
import "../Notes.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import NoteController from "../Controller/NoteController";
import Controller from "../Controller/UserController";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import LabelController from "../Controller/LabelController";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

class GetLabels extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      labelName: this.props.data2.labelname,
      id: this.props.data2.id,
      iconChange: false,
      autofocusField: false,
      baseColor: "#FDFEFE"
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      labelName: props.data2.labelname,
      id: props.data2.id
    });
  }

  onChangeRename = async event => {
    await this.setState({ labelName: event.target.value });
  };

  handleDeleteIcon = async () => {
    var labelDetails = {
      labelname: this.state.labelName,
      id: this.state.id
    };
    await LabelController.deletelabelforuser(labelDetails).then(res => {
      if (res.status === 200) {
        console.log("Successfully deleted label for user");
      }
    });

    this.props.getLabel();
    this.props.getNote();
  };

  handleEditIcon = async () => {
    await this.setState({
      iconChange: true,
      autofocusField: true,
      baseColor: "lightgrey"
    });
  };

  handleDoneIcon = async () => {
    if (this.state.labelName !== "") {
      var labelDetails = {
        labelname: this.state.labelName,
        id: this.state.id
      };
      await LabelController.editlabelforuser(labelDetails).then(res => {
        if (res.status === 200) {
          console.log("Successfully renamed label for user");
        }
      });

      await this.setState({
        iconChange: false,
        autofocusField: false,
        baseColor: "#FDFEFE"
      });
      this.props.getLabel();
      this.props.getNote();
    } else {
      await this.setState({
        iconChange: false,
        autofocusField: false,
        baseColor: "#FDFEFE"
      });
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Toolbar id="editlist-labels">
              <Grid item xs={2}>
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 100 }}
                  placement="left"
                  title={this.state.labelName}
                  arrow
                >
                  <IconButton aria-label="Label">
                    <LabelTwoToneIcon style={{ fontSize: "20px" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  backgroundColor: this.state.baseColor,
                  borderRadius: "2px"
                }}
              >
                <InputBase
                  disabled={!this.state.autofocusField}
                  id="inputBase_margin"
                  autofocusField={this.state.autofocusField}
                  spellCheck={false}
                  style={{
                    fontWeight: "bold",
                    width: "143px",
                    color: "#616161",
                    paddingLeft: "4px"
                  }}
                  defaultValue={this.state.labelName}
                  inputProps={{ "aria-label": "naked" }}
                  onChange={this.onChangeRename}
                />
              </Grid>
              <Grid item xs={2}>
                <div>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Delete label"
                    placement="left"
                    arrow
                  >
                    <IconButton aria-label="Delete label">
                      <DeleteTwoToneIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.handleDeleteIcon}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div>
                  {this.state.iconChange ? (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      placement="right"
                      title="Rename label"
                      arrow
                    >
                      <IconButton aria-label="Rename label">
                        <DoneIcon onClick={this.handleDoneIcon} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      placement="right"
                      title="Rename label"
                      arrow
                    >
                      <IconButton aria-label="Cancel">
                        <EditTwoToneIcon onClick={this.handleEditIcon} />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </Grid>
            </Toolbar>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default GetLabels;
