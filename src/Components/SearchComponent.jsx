import React, { Component } from "react";
import {
  Card,
  Paper,
  Button,
  Typography,
  Avatar,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import LabelRoundedIcon from "@material-ui/icons/LabelRounded";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import GetNotes from "../Components/GetNotes";

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: this.props.obj,
      obj3: this.props.obj3,
      view: this.props.view,
      searchNotesArr: this.props.searchNotesArr,
      profilePicture: this.props.profilePicture,
      searchOpen: this.props.searchOpen,
      searchListOpen: this.props.searchListOpen,
      uniqLabels: this.props.uniqLabels,
      uniqCollabs: this.props.uniqCollabs,
      uniqColors: this.props.uniqColors,
      uniqReminders: this.props.uniqReminders,
      open: this.props.open,
      limitLabel: true,
      limitCollab: true,
      limitColor: true,
      reminderFlag: this.props.reminderFlag,
      labelFlag: this.props.labelFlag,
      collabFlag: this.props.collabFlag,
      colorFlag: this.props.colorFlag,
      searchFlag: this.props.searchFlag,
      labelName: this.props.labelName,
      collabName: this.props.collabName,
      colorName: this.props.colorName,
      noResult: this.props.noResult,

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
    this.setState({
      obj: props.obj,
      obj3: props.obj3,
      view: props.view,
      searchOpen: props.searchOpen,
      searchListOpen: props.searchListOpen,
      uniqLabels: props.uniqLabels,
      uniqCollabs: props.uniqCollabs,
      uniqColors: props.uniqColors,
      uniqReminders: props.uniqReminders,
      open: props.open,
      searchNotesArr: props.searchNotesArr,
      searchFlag: props.searchFlag,
      reminderFlag: props.reminderFlag,
      labelFlag: props.labelFlag,
      collabFlag: props.collabFlag,
      colorFlag: props.colorFlag,
      labelName: props.labelName,
      collabName: props.collabName,
      colorName: props.colorName,
      noResult: props.noResult,
    });
  }
  handleLabelsMoreClick = async () => {
    await this.setState({
      limitLabel: !this.state.limitLabel,
    });
  };
  handleCollabsMoreClick = async () => {
    await this.setState({
      limitCollab: !this.state.limitCollab,
    });
  };
  handleColorsMoreClick = async () => {
    await this.setState({
      limitColor: !this.state.limitColor,
    });
  };

  render() {
    let labelsLimit = this.state.uniqLabels.slice(0, 4).map((elem) => {
      return (
        <div className="outerdiv-searchlabelpaper">
          <Paper
            elevation={3}
            id="label-paper"
            onClick={() => {
              this.props.handleLabelsClick(elem);
            }}
          >
            <div className="div-labeliconsearch">
              <LabelRoundedIcon id="labelstyle-search" />
            </div>
            <div className="div-labelnamesearch">
              <span>{elem}</span>
            </div>
          </Paper>
        </div>
      );
    });

    let labelsNolimit = this.state.uniqLabels.map((elem) => {
      return (
        <div className="outerdiv-searchlabelpaper">
          <Paper
            elevation={3}
            id="label-paper"
            onClick={() => {
              this.props.handleLabelsClick(elem);
            }}
          >
            <div className="div-labeliconsearch">
              <LabelRoundedIcon id="labelstyle-search" />
            </div>
            <div className="div-labelnamesearch">
              <span>{elem}</span>
            </div>
          </Paper>
        </div>
      );
    });

    let collabsLimit = this.state.uniqCollabs.slice(0, 3).map((elem) => {
      return (
        <div className="outerdiv-searchlabelpaper">
          <Paper
            elevation={3}
            id="collab-paper"
            onClick={() => {
              this.props.handleCollabsClick(elem);
            }}
          >
            <div className="div-labeliconsearch">
              <AccountCircleRoundedIcon id="collabstyle-search" />
            </div>
            <div>{elem}</div>
          </Paper>
        </div>
      );
    });

    let collabsNolimit = this.state.uniqCollabs.map((elem) => {
      return (
        <div className="outerdiv-searchlabelpaper">
          <Paper
            elevation={3}
            id="collab-paper"
            onClick={() => {
              this.props.handleCollabsClick(elem);
            }}
          >
            <div className="div-labeliconsearch">
              <AccountCircleRoundedIcon id="collabstyle-search" />
            </div>
            <div>{elem}</div>
          </Paper>
        </div>
      );
    });

    let colorsLimit = this.state.uniqColors.slice(0, 6).map((elem) => {
      var colorname;
      this.state.manycolor.map((col) => {
        if (col.colorCode === elem) {
          colorname = col.name;
        }
      });
      return (
        <div className="outerdiv-searchcolorpaper">
          <div className="div-coloriconsearch">
            <Tooltip title={colorname} arrow>
              <svg
                height="100"
                width="100"
                onClick={() => {
                  this.props.handleColorsClick(elem);
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="#424242"
                  stroke-width="2"
                  fill={elem}
                  cursor="pointer"
                />
              </svg>
            </Tooltip>
          </div>
        </div>
      );
    });

    let colorsNolimit = this.state.uniqColors.map((elem) => {
      var colorname;
      this.state.manycolor.map((col) => {
        if (col.colorCode === elem) {
          colorname = col.name;
        }
      });
      return (
        <div className="outerdiv-searchcolorpaper">
          <div className="div-coloriconsearch">
            <Tooltip title={colorname} arrow>
              <svg
                height="100"
                width="100"
                onClick={() => {
                  this.props.handleColorsClick(elem);
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="#424242"
                  stroke-width="2"
                  fill={elem}
                  cursor="pointer"
                />
              </svg>
            </Tooltip>
          </div>
        </div>
      );
    });

    let searchNotes = this.state.searchNotesArr.map((item) => {
      return (
        <GetNotes
          getNote={this.props.getNote}
          getLabel={this.props.getLabel}
          getNoteLabelArr={this.props.getNoteLabelArr}
          obj3={this.props.obj3}
          data={item}
          key={item.id}
          fromArchive={item.archived}
          view={this.state.view}
          handleLabelNoteMenu={this.props.handleLabelNoteMenu}
          profilePicture={this.state.profilePicture}
        />
      );
    });

    let colorNotes = this.state.obj.map((item) => {
      if (item.color === this.state.colorName) {
        return (
          <GetNotes
            getNote={this.props.getNote}
            getLabel={this.props.getLabel}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={item.archived}
            view={this.state.view}
            profilePicture={this.state.profilePicture}
          />
        );
      }
    });
    let collabNotes = this.state.obj.map((item) => {
      for (let i = 0; i < item.collaborator.length; i++) {
        const element = item.collaborator[i].collaborator;
        if (element === this.state.collabName) {
          return (
            <GetNotes
              getNote={this.props.getNote}
              getLabel={this.props.getLabel}
              obj3={this.props.obj3}
              data={item}
              key={item.id}
              fromArchive={item.archived}
              view={this.state.view}
              profilePicture={this.state.profilePicture}
            />
          );
        }
      }
    });
    let labelNotes = this.state.obj.map((item) => {
      for (let i = 0; i < item.labels.length; i++) {
        const element = item.labels[i].labelname;
        if (element === this.state.labelName) {
          return (
            <GetNotes
              getNote={this.props.getNote}
              getLabel={this.props.getLabel}
              obj3={this.props.obj3}
              data={item}
              key={item.id}
              fromArchive={item.archived}
              view={this.state.view}
              profilePicture={this.state.profilePicture}
            />
          );
        }
      }
    });
    let reminderNotes = this.state.obj.map((item) => {
      if (item.reminder !== null) {
        return (
          <GetNotes
            getNote={this.props.getNote}
            getLabel={this.props.getLabel}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={item.archived}
            view={this.state.view}
            profilePicture={this.state.profilePicture}
          />
        );
      }
    });

    return (
      <div style={{ marginTop: "10%" }}>
        {this.state.searchOpen ? (
          <div>
            {this.state.searchListOpen ? (
              <div className={this.state.open ? "shift-true" : "shift-false"}>
                {this.state.noResult ? (
                  <div className="noresult-search">No matching results.</div>
                ) : null}
                {this.state.uniqReminders.length !== 0 ? (
                  <div>
                    <Card id="card_decor7">
                      <div className="span-labels">
                        <span>Types</span>
                      </div>
                      <div className="labelsalign-decor">
                        <div className="outerdiv-searchlabelpaper">
                          <Paper
                            elevation={3}
                            id="types-paper"
                            onClick={this.props.handleRemindersClick}
                          >
                            <div className="div-labeliconsearch">
                              <AddAlertOutlinedIcon id="reminderstyle-search" />
                            </div>
                            <div className="div-labelnamesearch">
                              <span style={{ color: "white" }}>Reminders</span>
                            </div>
                          </Paper>
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : null}
                {this.state.uniqLabels.length !== 0 ? (
                  <div>
                    <Card id="card_decor7">
                      <div>
                        <div className="span-labels">
                          <span>Labels</span>
                        </div>
                        {this.state.limitLabel ? (
                          <div>
                            {this.state.uniqLabels.length >= 5 && (
                              <div className="div-morebutton">
                                <button
                                  className="more-button"
                                  onClick={this.handleLabelsMoreClick}
                                >
                                  <span style={{ color: "#1a73e8" }}>More</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="div-morebutton">
                            <button
                              className="more-button"
                              onClick={this.handleLabelsMoreClick}
                            >
                              <span style={{ color: "#1a73e8" }}>Less</span>
                            </button>
                          </div>
                        )}
                      </div>
                      {this.state.limitLabel ? (
                        <div className="labelsalign-decor">{labelsLimit}</div>
                      ) : (
                        <div className="labelsalign-decor">{labelsNolimit}</div>
                      )}
                    </Card>
                  </div>
                ) : null}
                {this.state.uniqCollabs.length !== 0 ? (
                  <div>
                    <Card id="card_decor7">
                      <div>
                        <div className="span-labels">
                          <span>People</span>
                        </div>
                        {this.state.limitCollab ? (
                          <div>
                            {this.state.uniqCollabs.length >= 4 && (
                              <div className="div-morebutton">
                                <button
                                  className="more-button"
                                  onClick={this.handleCollabsMoreClick}
                                >
                                  <span style={{ color: "#1a73e8" }}>More</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="div-morebutton">
                            <button
                              className="more-button"
                              onClick={this.handleCollabsMoreClick}
                            >
                              <span style={{ color: "#1a73e8" }}>Less</span>
                            </button>
                          </div>
                        )}
                      </div>
                      {this.state.limitCollab ? (
                        <div className="labelsalign-decor">{collabsLimit}</div>
                      ) : (
                        <div className="labelsalign-decor">
                          {collabsNolimit}
                        </div>
                      )}
                    </Card>
                  </div>
                ) : null}
                {this.state.uniqColorslength !== 0 ? (
                  <div>
                    <Card id="card_decor7">
                      <div>
                        <div className="span-labels">
                          <span>Colors</span>
                        </div>
                        {this.state.limitColor ? (
                          <div>
                            {this.state.uniqColors.length >= 7 && (
                              <div className="div-morebutton">
                                <button
                                  className="more-button"
                                  onClick={this.handleColorsMoreClick}
                                >
                                  <span style={{ color: "#1a73e8" }}>More</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="div-morebutton">
                            <button
                              className="more-button"
                              onClick={this.handleColorsMoreClick}
                            >
                              <span style={{ color: "#1a73e8" }}>Less</span>
                            </button>
                          </div>
                        )}
                      </div>
                      {this.state.limitColor ? (
                        <div className="labelsalign-decor">{colorsLimit}</div>
                      ) : (
                        <div className="labelsalign-decor">{colorsNolimit}</div>
                      )}
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={this.state.open ? "shift-true" : "shift-false"}>
                {this.state.reminderFlag && (
                  <div className="remindersearch_notes">{reminderNotes}</div>
                )}
                {this.state.labelFlag && (
                  <div className="remindersearch_notes">{labelNotes}</div>
                )}
                {this.state.collabFlag && (
                  <div className="remindersearch_notes">{collabNotes}</div>
                )}
                {this.state.colorFlag && (
                  <div className="remindersearch_notes">{colorNotes}</div>
                )}
                {this.state.searchFlag && (
                  <div className="remindersearch_notes">{searchNotes}</div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchComponent;
