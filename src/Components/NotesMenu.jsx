import React, { useState, Fragment, Component, PureComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SimpleExpansionPanel from "./TakeNote";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import CreateNote from "./CreateNote";
import GetNotes from "../Components/GetNotes";
import "../Notes.css";
import Controller from "../Controller/NoteController";

const drawerWidth = 244;

class NotesMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      getNote: this.props.getNote,
      pinnedStatus: false,
      obj3: this.props.obj3
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj,
      obj3: props.obj3
    });
  }
  getNote123 = async () => {
    let data = await Controller.getNotes().then(res => {
      this.setState({
        obj: res
      });
    });
  };

  render() {
    var pinflag = false;
    var othersflag = false;
    let othersnotes = this.state.obj.map(item => {
      if (!item.archived && !item.trashed && !item.pinned) {
        othersflag = true;
        return (
          <GetNotes
            getNote={this.props.getNote}
            getNoteLabelArr={this.props.getNoteLabelArr}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={false}
          />
        );
      }
    });

    let pinnednotes = this.state.obj.map(item => {
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
                />
              </div>
            </div>

            {pinflag ? (
              <div>
                <div className="pin_heading">PINNED</div>
                <div className="pin_notes">{pinnednotes}</div>
                {othersflag ? (
                  <div>
                    <div className="others_heading">OTHERS</div>
                    <div className="get_notes">{othersnotes}</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div>
                <div className="get_notes">{othersnotes}</div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default NotesMenu;
