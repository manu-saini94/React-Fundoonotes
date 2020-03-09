import React, { useState, Fragment, Component, PureComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SimpleExpansionPanel from "./TakeNote";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import CreateNote from "./CreateNote";
import GetNotes from "../Components/GetNotes";
import "../Notes.css";

const drawerWidth = 244;

class NotesMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      getNote: this.props.getNote,
      pinnedStatus: false
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj
    });
  }

  render() {
    var pinflag = false;

    let othersnotes = this.state.obj.map(item => {
      if (!item.archived && !item.trashed && !item.pinned) {
        return <GetNotes getNote={this.props.getNote} data={item} />;
      }
    });

    let pinnednotes = this.state.obj.map(item => {
      if (!item.archived && !item.trashed && item.pinned) {
        pinflag = true;
        return <GetNotes getNote={this.props.getNote} data={item} />;
      }
    });

    return (
      <div>
        {this.props.notesOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateNote getNote={this.props.getNote} />
              </div>
            </div>

            {pinflag ? (
              <div>
                <div className="pin_heading">PINNED</div>
                <div className="pin_notes">{pinnednotes}</div>

                <div className="others_heading">OTHERS</div>
                <div className="get_notes">{othersnotes}</div>
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
