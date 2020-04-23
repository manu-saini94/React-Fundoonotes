import React, { useState, Fragment, Component, PureComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SimpleExpansionPanel from "./TakeNote";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import CreateNote from "./CreateNote";
import NotesIcon from "@material-ui/icons/Notes";
import GetNotes from "../Components/GetNotes";
import "../Notes.css";
import Controller from "../Controller/NoteController";

const drawerWidth = 244;

class NotesMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      pinnedStatus: false,
      obj3: this.props.obj3,
      view: this.props.view,
      profilePicture: this.props.profilePicture,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj,
      obj3: props.obj3,
      view: props.view,
    });
  }
  getNote123 = async () => {
    let data = await Controller.getNotes().then((res) => {
      this.setState({
        obj: res,
      });
    });
  };

  render() {
    var pinflag = false;
    var othersflag = false;
    let othersnotes = this.state.obj.map((item) => {
      if (!item.archived && !item.trashed && !item.pinned) {
        othersflag = true;
        return (
          <GetNotes
            getNote={this.props.getNote}
            getLabel={this.props.getLabel}
            getNoteLabelArr={this.props.getNoteLabelArr}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={false}
            view={this.state.view}
            handleLabelNoteMenu={this.props.handleLabelNoteMenu}
            profilePicture={this.state.profilePicture}
          />
        );
      }
    });

    let pinnednotes = this.state.obj.map((item) => {
      if (!item.archived && !item.trashed && item.pinned) {
        pinflag = true;
        return (
          <GetNotes
            getNote={this.props.getNote}
            getLabel={this.props.getLabel}
            getNoteLabelArr={this.props.getNoteLabelArr}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={false}
            view={this.state.view}
            handleLabelNoteMenu={this.props.handleLabelNoteMenu}
            profilePicture={this.state.profilePicture}
          />
        );
      }
    });

    return (
      <div>
        {this.props.notesOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateNote
                  getNote={this.props.getNote}
                  getLabel={this.props.getLabel}
                  obj3={this.props.obj3}
                  profilePicture={this.state.profilePicture}
                />
              </div>
            </div>
            {pinflag === true || othersflag === true ? (
              <div>
                {pinflag ? (
                  <div>
                    <div>
                      <div
                        className={
                          !this.state.view ? "pin_heading" : "pin_heading_view"
                        }
                      >
                        PINNED
                      </div>
                      <div className="pin_notes">{pinnednotes}</div>
                    </div>
                    {othersflag ? (
                      <div>
                        <div
                          className={
                            !this.state.view
                              ? "others_heading"
                              : "others_heading_view"
                          }
                        >
                          OTHERS
                        </div>
                        <div className="get_notes">{othersnotes}</div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div style={{ marginTop: "3%" }}>
                    <div className="get_notes">{othersnotes}</div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div>
                  <NotesIcon
                    style={{
                      fontSize: "115px",
                      marginTop: "100px",
                      color: "lightgrey",
                    }}
                  />
                </div>
                <div className="noarchive_head">Notes you add appear here</div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
export default NotesMenu;
