import React, { Component } from "react";
import GetNotes from "../Components/GetNotes";
import CreateLabelNote from "../Components/CreateLabelNote";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";

class LabelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      labelName: this.props.labelName
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ obj: props.obj, labelName: props.labelName });
  }
  render() {
    var pinflag = false;
    var othersflag = false;
    let archiveflag = false;
    let othersnotes = this.state.obj.map(item => {
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
              />
            );
          }
        }
      }
    });

    let archivenotes = this.state.obj.map(item => {
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
              />
            );
          }
        }
      }
    });

    let pinnednotes = this.state.obj.map(item => {
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
              />
            );
          }
        }
      }
    });

    return (
      <div>
        {this.props.labelNoteOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateLabelNote
                  getNote={this.props.getNote}
                  getLabel={this.props.getLabel}
                  obj3={this.props.obj3}
                  labelName={this.props.labelName}
                />
              </div>
            </div>

            {pinflag || archiveflag ? (
              <div>
                {pinflag ? (
                  <div>
                    <div className="pin_heading">PINNED</div>
                    <div className="pin_notes">{pinnednotes}</div>
                  </div>
                ) : null}
                {archiveflag ? (
                  <div>
                    <div className="others_heading">ARCHIVE</div>
                    <div className="get_notes">{archivenotes}</div>
                  </div>
                ) : null}

                {othersflag ? (
                  <div>
                    <div className="others_heading">OTHERS</div>
                    <div className="get_notes">{othersnotes}</div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                {othersflag ? (
                  <div>
                    <div className="others_heading"></div>
                    <div className="get_notes">{othersnotes}</div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <LabelTwoToneIcon
                        style={{
                          fontSize: "115px",
                          marginTop: "100px",
                          color: "lightgrey"
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
