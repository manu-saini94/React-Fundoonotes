import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class ArchiveMenu extends PureComponent {
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
      view: props.view,
      profilePicture: props.profilePicture,
    });
  }
  render() {
    var archiveflag = false;
    let archiveNotes = this.state.obj.map((item) => {
      if (item.archived && !item.trashed && !item.pinned) {
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
    });

    return (
      <div style={{ marginTop: "55px" }}>
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
                      color: "lightgrey",
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
