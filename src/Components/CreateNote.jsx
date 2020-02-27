import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card';
import { InputBase, MuiThemeProvider, createMuiTheme, Tooltip, Grid, makeStyles } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Button from '@material-ui/core/Button';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import Pin from '../IMG/pin.svg';
import Unpin from '../IMG/unpin.svg';
import Controller from '../Controller/UserController';
import "../App.css";

const saveclose = "Save & Close";
// const theme = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             // padding: "12px 8px 7px"

//         },
//         MuiSvgIcon: {
//             root: {
//                 // fontSize: "1.2rem"
//             }
//         }
//     }
// })

const useStyles = makeStyles(theme => ({


    menuButton: {
        marginRight: theme.spacing(2),
    },
}))

export default class CreateNote extends Component {


    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: '',
            description: '',
            craeteNote: false,

            isTrashed: false,
            isArchived: false,
            isPinned: false,
            color: "",
            reminder: "",
            labelName: "",
            createdTime: ""
        }
    }

    handleClickOpen = () => {
        this.setState({
            openNote: true
        })
    }
    handleClickClose = () => {
        this.setState({
            openNote: false
        })
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    onChangeDescription = (event) => {

        this.setState({
            description: event.target.value
        })
    }

    handleIsPinned = () => {
        this.setState({ isPinned: !this.state.isPinned })

    }

    onClose = () => {

        if (this.state.title === '' && this.state.description === '') {
            this.setState({
                openNote: false
            })
        }
        else {
            var noteDetails = {
                title: this.state.title,
                takeanote: this.state.description,
                createdtime: this.state.createdTime,
                trashed: this.state.isTrashed,
                archived: this.state.isArchived,
                pinned: this.state.isPinned,
                color: this.state.color,
                reminder: this.state.reminder,
                labelName: this.state.labelName


            }
            Controller.takenote(noteDetails).then((res) => {
                console.log("hiii...", res)
                if (res.status === 200) {
                    console.log(res.data.message)
                }

            })
            this.setState({
                openNote: false
            })
        }
    }


    render() {
        // const classes = useStyles();

        return (

            <div>
                {!this.state.openNote ? (

                    <Card className="note-button" style={{ margin: '7% 20% 0 37%' }}>
                        <MuiThemeProvider >
                            <InputBase className="inputbase" style={{ paddingLeft: '10px' }}
                                multiline
                                spellCheck={true}
                                placeholder="Take a note...."
                                onClick={this.handleClickOpen}
                            />
                        </MuiThemeProvider>

                    </Card>
                )


                    :
                    <Card style={{ margin: '7% 20% 0 37%' }}>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <InputBase className="inputbase" style={{ paddingLeft: '15px' }}
                                    multiline
                                    // spellCheck={true}
                                    placeholder="Tittle...."
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}

                                />
                                {
                                    !this.state.isPinned ?
                                        <Tooltip title="Pin" arrow>
                                            <IconButton aria-label="Pin" >
                                                <img src={Pin} onClick={this.handleIsPinned} />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Unpin" arrow>
                                            <IconButton aria-label="Unpin" >
                                                <img src={Unpin} onClick={this.handleIsPinned} />
                                            </IconButton>
                                        </Tooltip>
                                }

                            </div>

                            <InputBase className="inputbase" style={{ paddingLeft: '15px' }}
                                multiline
                                // spellCheck={true}
                                placeholder="Description...."
                                value={this.state.description}
                                onChange={this.onChangeDescription}

                            />
                        </div>

                        <MuiThemeProvider >
                            <div>
                                <div className="buttons" style={{ display: 'flex' }}>
                                    <div>
                                        <Tooltip title="Reminder" arrow>
                                            <IconButton aria-label="Reminder" className="iconButtons">
                                                <AddAlertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Collaborator" arrow>
                                            <IconButton aria-label="Collaborator">
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="color" arrow>
                                            <IconButton aria-label="color" >
                                                <PaletteOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Archive" arrow>
                                            <IconButton aria-label="Archive">
                                                <ArchiveOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>


                                    <div>
                                        <Tooltip title="More" arrow>
                                            <IconButton aria-label="More">
                                                <MoreVertTwoToneIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="CloseButton">
                                        <Tooltip title={saveclose} arrow>
                                            <Button onClick={this.onClose} >
                                                Close
                                             </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                                {/* <div className="CloseButton"> */}
                                {/* onClick={this.handleClickClose }
                                    
                                    } */}

                                {/* </div> */}
                            </div>
                        </MuiThemeProvider>

                    </Card>
                }

            </div>
        )
    }
}