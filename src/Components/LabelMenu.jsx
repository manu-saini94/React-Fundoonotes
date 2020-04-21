import React, { Component } from "react";
import GetNotes from "../Components/GetNotes";
import CreateLabelNote from "../Components/CreateLabelNote";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";

class LabelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      labelName: this.props.labelName,
      view: this.props.view,
      profilePicture: this.props.profilePicture,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj,
      labelName: props.labelName,
      view: props.view,
      profilePicture: props.profilePicture,
    });
  }
  render() {
    var pinflag = false;
    var othersflag = false;
    let archiveflag = false;
    let othersnotes = this.state.obj.map((item) => {
      if (!item.archived && !item.trashed && !item.pinned) {
        for (let i = 0; i < item.labels.length; i++) {
          const element = item.labels[i].labelname;
          if (element === this.state.labelName) {
            othersflag = true;
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
          }
        }
      }
    });

    let archivenotes = this.state.obj.map((item) => {
      if (item.archived && !item.trashed && !item.pinned) {
        for (let i = 0; i < item.labels.length; i++) {
          const element = item.labels[i].labelname;
          if (element === this.state.labelName) {
            archiveflag = true;
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
        }
      }
    });

    let pinnednotes = this.state.obj.map((item) => {
      if (!item.archived && !item.trashed && item.pinned) {
        for (let i = 0; i < item.labels.length; i++) {
          const element = item.labels[i].labelname;
          if (element === this.state.labelName) {
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
                profilePicture={this.state.profilePicture}
              />
            );
          }
        }
      }
    });

    return (
      <div style={{ marginTop: "55px" }}>
        {this.props.labelNoteOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateLabelNote
                  getNote={this.props.getNote}
                  getLabel={this.props.getLabel}
                  obj3={this.props.obj3}
                  labelName={this.props.labelName}
                  profilePicture={this.state.profilePicture}
                />
              </div>
            </div>

            {pinflag || archiveflag ? (
              <div>
                {pinflag ? (
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
                ) : null}
                {archiveflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view
                          ? "others_heading"
                          : "others_heading_view"
                      }
                    >
                      ARCHIVE
                    </div>
                    <div className="get_notes">{archivenotes}</div>
                  </div>
                ) : null}

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
                ) : null}
              </div>
            ) : (
              <div>
                {othersflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view
                          ? "others_heading"
                          : "others_heading_view"
                      }
                    ></div>
                    <div style={{ marginTop: "-2%" }}>
                      <div className="get_notes">{othersnotes}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <LabelTwoToneIcon
                        style={{
                          fontSize: "115px",
                          marginTop: "100px",
                          color: "lightgrey",
                        }}
                      />
                    </div>
                    <div className="noarchive_head">
                      No notes with this label yet
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default LabelMenu;
