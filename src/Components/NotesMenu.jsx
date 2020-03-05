import React, { useState, Fragment, Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SimpleExpansionPanel from './TakeNote'
import clsx from 'clsx';
import { useTheme } from "@material-ui/core/styles";
import CreateNote from './CreateNote';
import GetNotes from '../Components/GetNotes';
import '../Notes.css';


const drawerWidth = 244;

// const useStyles = makeStyles(theme => ({
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen
//         }),
//         marginLeft: -200
//     },
//     contentShift: {
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen
//         }),
//         marginLeft: 0
//     }
// }))



// const theme = useTheme();
// const val = props.noteOpen;
// const handlenoteOpen = () => {

// }
class NotesMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            obj: this.props.obj,
            pinnedStatus: false
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            obj: props.obj
        })
    }

    // componentDidMount(props) {
    //     this.setState({
    //         obj: props.obj
    //     })
    // }
    render() {
        var pinflag = false;
        console.log(this.state.obj)
        // const classes = { useStyles };
        let othersnotes =
            this.state.obj.map(item => {
                if (!item.archived && !item.trashed && !item.pinned) {
                    return (

                        <GetNotes getNote={this.props.getNote} data={item} />
                    )
                }
            })

        let pinnednotes = this.state.obj.map(item => {

            if (!item.archived && !item.trashed && item.pinned) {
                pinflag = true
                return (

                    < GetNotes getNote={this.props.getNote} data={item} />
                )
            }

        })

        console.log("pin notes ", pinnednotes)
        console.log("other notes ", othersnotes)
        console.log("pinnedstatus : ", this.state.pinnedStatus)
        return (

            < div >
                {
                    this.props.notesOpen ?
                        // <main className={clsx(classes.content, {
                        //     [classes.contentShift]: this.props.open,
                        // })}>
                        <div
                            className={this.props.open ? "shift-true" : "shift-false"}
                        >
                            <div className="create_note">
                                <div>
                                    <CreateNote getNote={this.props.getNote} />
                                </div>
                            </div>

                            {pinflag ?
                                <div>
                                    <div className="pin_heading">PINNED</div>
                                    <div className="pin_notes"  >
                                        {pinnednotes}
                                    </div>

                                    <div className="others_heading">OTHERS</div>
                                    <div className="get_notes"  >
                                        {othersnotes}
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="get_notes"  >
                                        {othersnotes}
                                    </div>
                                </div>

                            }

                        </div>



                        :
                        <div>
                        </div>
                }
            </div >












            //         <main className={clsx(classes.content, {
            //             [classes.contentShift]: props.open,
            //         })}>

            // {/* 
            //             <SimpleExpansionPanel 
            //                 value={props.noteOpen}
            //                 open={props.open}
            //              />
            //  */}


            //         </main>
        )
    }

}
export default NotesMenu