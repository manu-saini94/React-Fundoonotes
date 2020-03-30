import React, { Component } from "react";
import GetNotes from "../Components/GetNotes";
import CreateLabelNote from "../Components/CreateLabelNote";

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

    let pinnednotes = this.state.obj.map(item => {
      if (!item.archived && !item.trashed && item.pinned) {
        for (let i = 0; i < item.labels.length; i++) {
          const element = item.labels[i].labelname;
          if (element === this.state.labelName) {
            pinflag = true;
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

export default LabelMenu;
