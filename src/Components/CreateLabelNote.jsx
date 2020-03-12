import React, { Component } from 'react';


class CreateLabelNote extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            obj: props.obj
        });
    }




    render() {
        // var pinflag = false;
        // var othersflag = false;
        // let othersnotes = this.state.obj.map(item => {
        //     if (!item.archived && !item.trashed && !item.pinned) {
        //         othersflag = true;
        //         return <GetNotes getNote={this.props.getNote} data={item} key={item.id} />;
        //     }
        // });

        // let pinnednotes = this.state.obj.map(item => {
        //     if (!item.archived && !item.trashed && item.pinned) {
        //         pinflag = true;
        //         return <GetNotes getNote={this.props.getNote} data={item} key={item.id} />;
        //     }
        // });
        return (
            <div>
                {/* {this.props.notesOpen ? (
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
                    )} */}
            </div>
        )
    }
}


export default CreateLabelNote
