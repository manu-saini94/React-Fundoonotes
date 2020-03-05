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
const bgcolor = "";
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
            open: false,
            menu: false,
            openNote: false,
            title: '',
            description: '',
            createNote: false,
            isArchived: false,
            archivemsg: "",
            isPinned: false,
            reminder: "",
            labelName: "",
            createdTime: "",
            colorTooltipOpen: false,
            colorAnchor: null,
            colorOpen: false,
            color: "#FDFEFE",
            getNote: this.props.getNote,
            manycolor:
                [{ name: "White", colorCode: "#FDFEFE" },
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

        }
    }




    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false })
    }

    handleClickOpen = () => {
        this.setState({
            openNote: true
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

    handleIsArchived = async () => {
        console.log("in archive", this.state.isPinned + "   " + this.state.isArchived);

        if ((this.state.title !== " " || this.state.description !== " ") && this.state.isPinned === true) {

            await this.setState({
                isPinned: false,
                isArchived: true,
                archivemsg: "Note Unpinned and Archived",
                open: true
            })

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


            await Controller.takenote(noteDetails).then((res) => {

                if (res.status === 200) {

                }

            })
            await this.setState({
                title: '',
                description: '',
                createNote: false,
                isArchived: false,
                isPinned: false,
                color: "#FDFEFE",
                reminder: "",
                labelName: "",
                createdTime: "",
            })



        }
        else
            if (this.state.title !== "" || this.state.description !== "") {
                await this.setState({
                    isArchived: true,
                    archivemsg: "Note Archived",
                    open: true
                })

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
                await Controller.takenote(noteDetails).then((res) => {

                    if (res.status === 200) {

                    }

                })
                await this.setState({
                    title: '',
                    description: '',
                    createNote: false,
                    isArchived: false,
                    isPinned: false,
                    color: "#FDFEFE",
                    reminder: "",
                    labelName: "",
                    createdTime: "",
                })
            }
            else {
                this.setState({ archivemsg: "Cannot Archive" })
                this.setState({ open: true })
            }

    }
    changeColor = (event) => {
        this.setState({
            colorOpen: true,
            colorAnchor: event.currentTarget,
            colorTooltipOpen: true
        })
    }
    changeNoteColor = (event) => {

        this.setState({ color: event.target.value })
    }
    closeColorBox = () => {
        this.setState({
            colorOpen: false,
            colorAnchor: null,
            colorTooltipOpen: false
        })
    }

    MenuClose = () => {
        this.setState({ menu: false })
    }
    openMenu = () => {
        this.setState({ menu: true })
    }
    onClose = async () => {

        if (this.state.title === '' && this.state.description === '') {
            await this.setState({
                title: '',
                description: '',
                createNote: false,
                isArchived: false,
                archivemsg: "",
                isPinned: false,
                color: "#FDFEFE",
                reminder: "",
                labelName: "",
                createdTime: "",
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

            await Controller.takenote(noteDetails).then((res) => {
                console.log("hiii...", res)
                if (res.status === 200) {
                    console.log(res.data.message)

                }

            })
            await this.setState({
                title: '',
                description: '',
                createNote: false,
                isArchived: false,
                archivemsg: "",
                isPinned: false,
                color: "#FDFEFE",
                reminder: "",
                labelName: "",
                createdTime: "",
                openNote: false
            })
        }
        this.props.getNote();
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

            <div style={{
                marginTop: '85px',

            }}>
                {!this.state.openNote ? (
                    <div className="note-button">
                        <Card
                            id="card_decor1"
                        >
                            <MuiThemeProvider >
                                <InputBase className="inputbase" style={{
                                    paddingLeft: '10px', paddingRight: '58%', fontWeight: 'bold'
                                }}
                                    multiline
                                    spellCheck={true}
                                    placeholder="Take a note...."
                                    onClick={this.handleClickOpen}
                                />
                            </MuiThemeProvider>

                        </Card>
                    </div>
                )


                    :
                    <div className="note-button">
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
                                                        <img src={Pin} onClick={this.handleIsPinned} />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>

                                            :
                                            <div style={{
                                                marginRight: '-21px'
                                            }}>
                                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 100 }} title="Unpin" arrow>
                                                    <IconButton aria-label="Unpin" >
                                                        <img src={Unpin} onClick={this.handleIsPinned} />
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
                                    </Toolbar>
                                </div>
                            </MuiThemeProvider>

                        </Card>
                    </div>}

            </div>
        )
    }
}