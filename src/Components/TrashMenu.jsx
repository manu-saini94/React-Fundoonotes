import React, { Component, PureComponent } from "react";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import GetTrashNotes from "../Components/GetTrashNotes";
import NoteController from "../Controller/NoteController";
import Button from "@material-ui/core/Button";

class TrashMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      getNote: this.props.getNote,
      view: this.props.view,
    };
  }

  handleEmptyTrash = async () => {
    await NoteController.emptytrash().then((res) => {
      if (res.status === 200) {
        console.log("Trash Empty Successfully");
      }
    });
    this.props.getNote();
  };
  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj,
      view: props.view,
    });
  }
  render() {
    var trashflag = false;
    let trashNotes = this.state.obj.map((item) => {
      if (item.trashed) {
        trashflag = true;
        return (
          <GetTrashNotes
            getNote={this.props.getNote}
            data={item}
            obj3={this.props.obj3}
            view={this.state.view}
          />
        );
      }
    });

    return (
      <div>
        {this.props.trashOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            {trashflag ? (
              <div style={{ marginTop: "31px" }}>
                <div
                  style={{
                    width: "100%",
                    marginLeft: "17%",
                    fontWeight: "bold",
                  }}
                >
                  <Button onClick={this.handleEmptyTrash} color="primary">
                    Empty Trash
                  </Button>
                </div>
                <div className="trash_notes">{trashNotes}</div>
              </div>
            ) : (
              <div>
                <div>
                  <DeleteOutlinedIcon
                    style={{
                      fontSize: "115px",
                      marginTop: "100px",
                      color: "lightgrey",
                      marginLeft: "-27px",
                    }}
                  />
                </div>
                <div className="notrash_head">No notes in Trash</div>
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

export default TrashMenu;
