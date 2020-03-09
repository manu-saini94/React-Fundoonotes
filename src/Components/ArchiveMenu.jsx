import React, { Component, PureComponent } from "react";
import GetArchiveNotes from "../Components/GetArchiveNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class ArchiveMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      getNote: this.props.getNote
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      obj: props.obj
    });
  }
  render() {
    var archiveflag = false;
    let archiveNotes = this.state.obj.map(item => {
      if (item.archived && !item.trashed && !item.pinned) {
        archiveflag = true;
        return <GetArchiveNotes getNote={this.props.getNote} data={item} />;
      }
    });

    return (
      <div>
        {this.props.archiveOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            {archiveflag ? (
              <div>
                <div className="archive_notes">{archiveNotes}</div>
              </div>
            ) : (
              <div>
                <div>
                  <ArchiveOutlinedIcon
                    style={{
                      fontSize: "115px",
                      marginTop: "100px",
                      color: "lightgrey"
                    }}
                  />
                </div>
                <div className="noarchive_head">
                  Your archived notes appear here
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

export default ArchiveMenu;
