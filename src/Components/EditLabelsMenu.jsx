import React from "react";
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
import GetLabels from "../Components/GetLabels";

class EditLabelsMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: this.props.openDialog,
      labelName: "",
      openSnack: false,
      message: "",
      obj2: this.props.obj2
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      obj2: props.obj2,
      openDialog: props.openDialog
    });
  }
  componentDidMount(props) {
    // this.props.getLabel();
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnack: false });
  };
  handleDialogClickaway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.handleEditLabelsMenu();
    await this.setState({ openDialog: false });
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
    this.props.getNote();
  };

  handleCancel = async () => {
    await this.setState({ labelName: "" });
  };

  onCloseDialog = async () => {
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
    this.props.getLabel();
    this.props.handleEditLabelsMenu();
    this.props.getNote();
  };
  render() {
    console.log("array is :", this.state.obj2);
    let getAllLabels = this.state.obj2.map(item2 => {
      return (
        <GetLabels
          getLabel={this.props.getLabel}
          getNote={this.props.getNote}
          data2={item2}
          key={item2.id}
        />
      );
    });

    console.log(this.props.openDialog);

    return (
      <div className="dialog_note">
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleDialogClickaway}
        >
          <div>
            <Card id="card_decordialog">
              <div>
                <div style={{ display: "flex" }}>
                  <Typography
                    className="editlabels_typ"
                    style={{
                      paddingLeft: "15px",
                      paddingRight: "32px",
                      marginTop: "15px",
                      fontWeight: "bolder",
                      color: "#616161"
                    }}
                    spellCheck={false}
                    value="Edit labels"
                  >
                    Edit labels
                  </Typography>
                </div>
              </div>
              <MuiThemeProvider>
                <div>
                  <Toolbar>
                    <div id="outdiv_createnewlabel">
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
                      <div className="input_createlabel">
                        <Input
                          placeholder="Create new label"
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
                </div>
              </MuiThemeProvider>
              <div>{getAllLabels}</div>
              <MuiThemeProvider>
                <div>
                  <Toolbar id="done_editlabels">
                    <div style={{ display: "flex" }}>
                      <div className="close_button">
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          arrow
                        >
                          <Button onClick={this.onCloseDialog}>Done</Button>
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

export default EditLabelsMenu;
