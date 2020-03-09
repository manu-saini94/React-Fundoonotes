import React, { Component } from 'react';
import { InputBase, MuiThemeProvider, createMuiTheme, MenuItem, Tooltip, Grid, makeStyles, Menu, Dialog, ReactFragment, Card } from '@material-ui/core';
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
import "../App.css";
import "../Notes.css";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import NoteController from "../Controller/NoteController";
import Controller from "../Controller/UserController";



const saveclose = "Save & Close";
class DialogCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.data.title,
            description: this.props.data.description,
            id: this.props.data.id,
            isArchived: this.props.data.isArchived,
            isPinned: this.props.data.isPinned,
            isTrashed: this.props.data.isTrashed,
            color: this.props.data.color,
            openDialog: this.props.openDialog,
            colorAnchor: null,
            openSnack: false,
            open: false,
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

    componentWillReceiveProps(props) {
        this.setState({
            openDialog: props.openDialog,
            title: props.data.title,
            description: props.data.description,
            id: props.data.id,
            isArchived: props.data.isArchived,
            isPinned: props.data.isPinned,
            isTrashed: props.data.isTrashed,
            color: props.data.color,
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false })
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


    closeColorBox = () => {
        this.setState({
            colorOpen: false,
            colorAnchor: null
        })
    }
    changeColor = (event) => {
        this.setState({
            colorOpen: true,
            colorAnchor: event.currentTarget
        })
    }
    changeNoteColor = async (event) => {

        await this.setState({ color: event.target.value })
        await NoteController.colornote(this.state.id, this.state.color).then((res) => {

            if (res.status === 200) {
                console.log("Color set Successfully")
            }

        })

    }

    handleIsPinned = async () => {
        await this.setState({ isPinned: true })
        await NoteController.pinnote(this.state.id).then((res) => {

            if (res.status === 200) {
                console.log("Successfully pinned")
            }

        })

    }

    handleIsUnpinned = async () => {
        await this.setState({ isPinned: false })
        await NoteController.pinnote(this.state.id).then((res) => {

            if (res.status === 200) {
                console.log("Successfully Unpinned")
            }

        })

    }

    handleIsArchived = async () => {

        if (this.state.isPinned === true) {

            await this.setState({
                isPinned: false,
                isArchived: true,
                archivemsg: "Note Unpinned and Archived",
                openSnack: true
            })

            await NoteController.archivenote(this.state.id).then((res) => {
                if (res.status === 200) {
                    console.log("Successfully unpinned and archived")
                }
            })
            await this.setState({ openDialog: false })
            await this.props.getNote();
        }
        else {
            await this.setState({
                isArchived: true,
                archivemsg: "Note Archived",
                openSnack: true
            })
            await NoteController.archivenote(this.state.id).then((res) => {
                if (res.status === 200) {
                    console.log("successfully archived")
                }

            })
            await this.setState({ openDialog: false })
            await this.props.getNote();
        }
    }


    onCloseDialog = async () => {
        var noteDetails = {
            id: this.state.id,
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

        await NoteController.setTitleDesc(noteDetails).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                console.log(res.data.message)

            }

        })
        //await this.setState({ openDialog: false })
        this.props.getNote();
        this.props.handleDialogClose();



    }

    render() {
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

            < div className="dialog_note" >
                <Dialog open={this.props.openDialog} >
                    <div >
                        <Card id="card_decor1" style={{
                            backgroundColor: this.state.color
                        }}>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <InputBase className="inputbase" style={{ paddingLeft: '15px', paddingRight: '32px', fontWeight: 'bolder', color: '#616161' }}
                                        multiline
                                        spellCheck={false}
                                        placeholder="Title...."
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}


                                    />

                                    {
                                        !this.state.isPinned ?
                                            <div style={{
                                                marginRight: '-21px'
                                            }}>
                                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Pin" arrow>

                                                    <IconButton aria-label="Pin"  >
                                                        <img style={{
                                                            height: "0.54cm",
                                                            width: "0.54cm"
                                                        }}
                                                            src={Pin} onClick={this.handleIsPinned} />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>

                                            :
                                            <div style={{
                                                marginRight: '-21px'
                                            }}>
                                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Unpin" arrow>
                                                    <IconButton aria-label="Unpin" >
                                                        <img
                                                            style={{
                                                                height: "0.54cm",
                                                                width: "0.54cm"
                                                            }}
                                                            src={Unpin} onClick={this.handleIsUnpinned} />
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
                                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }}
                                                    open={this.state.colorTooltipOpen}
                                                    title="Archive" arrow>
                                                    <IconButton aria-label="Archive" >
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
                                            <div className="close_button">
                                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title={saveclose} arrow>
                                                    <Button onClick={this.onCloseDialog} >
                                                        Close
                                             </Button>

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
                    </div>
                </Dialog>
            </div >
        )
    }
}

export default DialogCard
