import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card';
import { InputBase, MuiThemeProvider, createMuiTheme, MenuItem, Tooltip, Grid, makeStyles, Menu } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Button from '@material-ui/core/Button';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import Toolbar from '@material-ui/core/Toolbar';
import Pin from '../IMG/pin.svg';
import Unpin from '../IMG/unpin.svg';
import Controller from '../Controller/UserController';
import "../App.css";
import "../Notes.css";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';


const saveclose = "Save & Close";

class GetNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.data.title,
            description: this.props.data.takeanote,
            id: this.props.data.id,
            isArchived: this.props.data.archived,
            isPinned: this.props.data.pinned,
            isTrashed: this.props.data.trashed,
            color: this.props.data.color,
            getAllNotes: this.props.getNote,
            colorAnchor: null,
            open: false,
            dilogbox: true,
            menu: false,

            manycolor:
                [{ name: "default", colorCode: "#FDFEFE" },
                { name: "Red", colorCode: "#ef9a9a" },
                { name: "Cyan", colorCode: "#80deea" },
                { name: "Blue", colorCode: "#2196f3" },
                { name: "Indigo", colorCode: "#9fa8da" },
                { name: "LightBlue", colorCode: "#90caf9" },
                { name: "Purple", colorCode: "#b39ddb" },
                { name: "Yellow", colorCode: "#c5e1a5" },
                { name: "Lime", colorCode: "#e6ee9c" },
                { name: "Pink", colorCode: "#f48fb1" },
                { name: "gray", colorCode: "#eeeeee" },
                { name: "Brown", colorCode: "#bcaaa4" },
                ],

            defaultColour: "#FDFEFE",
            colorOpen: false,
            opencolourBox: false,
        }
    }


    // componentWillReceiveProps(props) {

    //     this.setState({
    //         title: this.props.data.title,
    //         description: this.props.data.description,
    //         id: this.props.data.id,
    //         isArchived: this.props.data.isArchived,
    //         isPinned: this.props.data.isPinned,
    //         isTrashed: this.props.data.isTrashed,
    //         color: this.props.data.color,
    //     })
    // }

    changeColor = (event) => {
        this.setState({
            colorOpen: true,
            colorAnchor: event.currentTarget
        })
    }
    changeNoteColor = (event) => {

        this.setState({ color: event.target.value })
    }

    render() {
        console.log("description is : ", this.props.data.takeanote)
        console.log("title is :", this.state.title)

        const color1 = this.state.manycolor.map((color) => {
            return (
                <div>
                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title={color.name}>
                        <IconButton style={{ background: color.colorCode }} value={color.colorCode} onClick={this.changeNoteColor} />
                    </Tooltip>
                </div>
            )

        })
        return (
            <Card id="card_decor2" style={{ backgroundColor: this.state.color }}>
                <div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <InputBase className="inputbase" style={{ marginTop: '9px', paddingLeft: '15px', paddingRight: '29px', fontWeight: 'bolder', color: '#616161' }}
                                multiline
                                spellCheck={false}
                                placeholder="Title...."
                                value={this.state.title}
                                onChange={this.onChangeTitle}


                            />
                        </div>
                        {
                            !this.state.isPinned ?
                                <div className={"pin_getnotes"}>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Pin" arrow>

                                        <IconButton aria-label="Pin"  >
                                            <img style={{
                                                height: "0.5cm",
                                                width: "0.5cm"
                                            }} src={Pin} onClick={this.handleIsPinned} />
                                        </IconButton>

                                    </Tooltip>
                                </div>
                                :
                                <div className={"pin_getnotes"}>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Unpin" arrow>
                                        <IconButton aria-label="Unpin" >
                                            <img style={{
                                                height: "0.5cm",
                                                width: "0.5cm"
                                            }} src={Unpin} onClick={this.handleIsPinned} />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                        }

                    </div>

                    <InputBase className="inputbase" style={{ paddingLeft: '15px', paddingRight: '26px', color: '#616161' }}
                        multiline
                        spellCheck={false}
                        placeholder="Description...."
                        value={this.state.description}
                        onChange={this.onChangeDescription}

                    />
                </div>

                <MuiThemeProvider >
                    <div>
                        <Toolbar>
                            <div className="buttons" style={{ display: 'flex' }}>
                                <div style={{ marginLeft: '6px' }}>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Reminder" arrow>
                                        <IconButton aria-label="Reminder" className="iconButtons">
                                            <AddAlertIcon style={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Collaborator" arrow>
                                        <IconButton aria-label="Collaborator">
                                            <PersonAddIcon style={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Color" arrow>
                                        <IconButton aria-label="Color" >
                                            <PaletteOutlinedIcon style={{ fontSize: '20px' }} onClick={this.changeColor} />
                                            <Menu id="simple-menu"
                                                open={this.state.colorOpen}
                                                anchorEl={this.state.colorAnchor}
                                                onClose={this.closeColorBox}
                                                transformOrigin={{ vertical: 'right', horizontal: 'right' }}
                                                className="colormenu"
                                            >
                                                <div style={{
                                                    display: 'flex',

                                                    marginBottom: '15px',
                                                    marginLeft: '58px'
                                                }}>
                                                    {color1}
                                                </div>
                                            </Menu>

                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Archive" arrow>
                                        <IconButton aria-label="Archive">
                                            <ArchiveOutlinedIcon style={{ fontSize: '20px' }} onClick={this.handleIsArchived} />
                                            <Snackbar
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                open={this.state.open}
                                                autoHideDuration={4000}
                                                onClose={this.handleClose}
                                                message={this.state.archivemsg}
                                                action={
                                                    <React.Fragment >
                                                        <div style={{
                                                            paddingBottom: '17px', marginRight: '-25px'
                                                        }}>
                                                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                                                <CloseIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>

                                </div>


                                <div className="menu_getnotes">
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="More" arrow>
                                        <IconButton aria-label="More">
                                            <MoreVertTwoToneIcon style={{ fontSize: '20px' }} />
                                            <div >
                                                <Menu open={this.state.menu}
                                                    transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                >

                                                    <MenuItem onClick={this.MenuClose}>Add label
                                                </MenuItem>
                                                </Menu>
                                            </div>
                                        </IconButton>
                                    </Tooltip>
                                </div>

                            </div>
                            {/* <div className="CloseButton"> */}
                            {/* onClick={this.handleClickClose }

                                    } */}

                            {/* </div> */}
                        </Toolbar>
                    </div>
                </MuiThemeProvider>

            </Card>


        )
    }
}

export default GetNotes
