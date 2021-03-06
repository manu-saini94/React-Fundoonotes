import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import NoteController from "../Controller/NoteController";

class GetLabelsInMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelName: this.props.item.labelname,
      id: this.props.item.id,
      checkedLabel: false,
      allLabels: this.props.allLabels,
      labelIschecked: false,
      tick: this.props.tick
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      labelName: props.item.labelname,
      id: props.item.id,
      allLabels: props.allLabels,
      tick: props.tick
    });
  }

  handleCheckLabel = async event => {
    await this.setState({ checkedLabel: event.target.checked });
    if (this.state.checkedLabel === true) {
      console.log(this.state.checkedLabel);
      let noteDetails = {
        labelname: this.state.labelName
      };

      this.props.handleLabel(this.state.labelName);
    } else if (this.state.checkedLabel === false) {
      let noteDetails = {
        labelname: this.state.labelName
      };

      this.props.handleLabelRemove(this.state.labelName);
    }

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
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "start",
              padding: "5px"
            }}
          >
            <div className="checkbox_label">
              {this.state.tick ? (
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
              ) : (
                <div>
                  <Checkbox
                    checked={this.state.tick}
                    onClick={this.handleCheckLabel}
                    // defaultChecked
                    color="default"
                    value="default"
                    inputProps={{ "aria-label": "checkbox with default color" }}
                  />
                </div>
              )}
            </div>
            <span className="labelname_field">{this.state.labelName}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GetLabelsInMenu;
