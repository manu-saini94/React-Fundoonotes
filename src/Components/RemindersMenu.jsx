import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import CreateNote from "./CreateNote";

class RemindersMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      getNote: this.props.getNote,
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
      profilePicture: props.profilePicture,
    });
  }
  render() {
    var reminderflag = false;
    let reminderNotes = this.state.obj.map((item) => {
      if (item.reminder !== null && !item.archived) {
        reminderflag = true;
        return (
          <GetNotes
            getNote={this.props.getNote}
            getNoteLabelArr={this.props.getNoteLabelArr}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={false}
            view={this.state.view}
            profilePicture={this.state.profilePicture}
          />
        );
      } else if (item.reminder !== null && item.archived) {
        reminderflag = true;
        return (
          <GetNotes
            getNote={this.props.getNote}
            getNoteLabelArr={this.props.getNoteLabelArr}
            obj3={this.props.obj3}
            data={item}
            key={item.id}
            fromArchive={true}
            view={this.state.view}
            profilePicture={this.state.profilePicture}
          />
        );
      }
    });

    return (
      <div>
        {this.props.remindersOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateNote
                  getNote={this.props.getNote}
                  getLabel={this.props.getLabel}
                  obj3={this.props.obj3}
                  labelName={this.props.labelName}
                  profilePicture={this.state.profilePicture}
                />
              </div>
            </div>
            {reminderflag ? (
              <div>
                <div className="archive_notes">{reminderNotes}</div>
              </div>
            ) : (
              <div>
                <div>
                  <NotificationsOutlinedIcon
                    style={{
                      fontSize: "115px",
                      marginTop: "100px",
                      color: "lightgrey",
                    }}
                  />
                </div>
                <div className="noarchive_head">
                  Notes with upcoming reminders appear here
                </div>
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

export default RemindersMenu;
