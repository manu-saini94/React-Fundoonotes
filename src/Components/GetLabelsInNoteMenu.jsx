import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import NoteController from "../Controller/NoteController";

class GetLabelsInNoteMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelName: this.props.item.labelname,
      id: this.props.item.id,
      checkedLabel: false,
      allLabels: this.props.allLabels,
      labelIschecked: false,
      tick: this.props.tick,
      data: this.props.data,
    };
    this.handleCheckLabel = this.handleCheckLabel.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      labelName: props.item.labelname,
      id: props.item.id,
      allLabels: props.allLabels,
      tick: props.tick,
      data: props.data,
    });
  }

  handleCheckLabel = async (event, props) => {
    await this.setState({ checkedLabel: event.target.checked });
    if (this.state.checkedLabel === true) {
      console.log(this.state.checkedLabel);
      let noteDetails = {
        labelname: this.state.labelName,
      };

      await NoteController.addlabeltonote(noteDetails, this.props.data.id).then(
        (res) => {
          if (res.status === 200) {
            console.log("Label added to the note successfully");
          }
        }
      );
    } else if (this.state.checkedLabel === false) {
      await NoteController.deletelabelfornote(
        this.props.data.id,
        this.state.id
      ).then((res) => {
        if (res.status === 200) {
          console.log("Label deleted for the note successfully");
        }
      });
    }
    this.props.getNote();

    // if (this.state.checkedLabel === true) {

    //     await NoteController.addlabeltonote(noteDetails).then((res) => {
    //         if (res.status === 200) {
    //             console.log("Label added to note successfully")
    //         }

    //     })
    // }
    // else
    //     if (this.state.checkedLabel === false) {

    //     }
  };

  // componentDidUpdate(props) {
  //     props.getLabel();
  // }

  render() {
    // console.log("My array is ", this.state.allLabels)
    // if (this.props.allLabels !== undefined) {
    //     let mat = this.state.allLabels.map(element => {
    //         if (this.state.labelName === element) {
    //             this.setState({
    //                 labelIschecked: true,
    //                 checkedLabel: true
    //             })
    //         }

    //     });
    // }
    return (
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "start",
              padding: "5px",
            }}
          >
            <div className="checkbox_label">
              <div>
                <Checkbox
                  checked={this.state.tick}
                  onClick={this.handleCheckLabel}
                  //defaultChecked
                  color="default"
                  value="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
              </div>
            </div>
            <span className="labelname_field">{this.state.labelName}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GetLabelsInNoteMenu;
