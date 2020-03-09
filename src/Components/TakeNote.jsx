import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TextField, Toolbar, Grid, IconButton } from '@material-ui/core';
import AddAlertTwoToneIcon from '@material-ui/icons/AddAlertTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import ColorLensTwoToneIcon from '@material-ui/icons/ColorLensTwoTone';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveTwoTone';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Pin from '../IMG/pin.svg';
import Unpin from '../IMG/unpin.svg';
import Controller from '../Controller/UserController';




const useStyles = makeStyles(theme => ({

    root: {
        border: 2,
        width: '50%',
        paddingLeft: '474px',
        marginLeft: '18px',
        paddingTop: '72px'


    },

    heading: {
        fontSize: theme.typography.pxToRem(2),
        fontWeight: theme.typography.fontWeightRegular,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));




export default function SimpleExpansionPanel(props) {
    const classes = useStyles();
    const [pholder, setPholder] = React.useState("Take a note...");
    const [openflag, setOpenflag] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const [takeanote, setTakeanote] = React.useState("");
    const [isPinned, setIsPinned] = React.useState(false);
    const [isArchived, setIsArchived] = React.useState(false);
    const [isTrashed, setIsTrashed] = React.useState(false);
    const [color, setColor] = React.useState("");
    const [reminder, setReminder] = React.useState("");
    const [labelName, setLabelName] = React.useState("");
    const [expansionOpen, setExpansionOpen] = useState(false);
    const val = props.value;
    console.log(props.value)

    const [abc, setAbc] = useState(false);
    useEffect(() => {
        if (title !== "" || takeanote !== "") {
            setOpenflag(false);
        } else {
            setOpenflag(true);
        }
        console.log(setAbc(!abc));

    }, [title, takeanote,])

    const onChangeTitle = event => {
        setAbc(true)
        setTitle(event.target.value);
        console.log(title)
        console.log(openflag)

    }

    const onChangeTakeanote = event => {
        setTakeanote(event.target.value);
        console.log(takeanote)
        console.log(openflag)
    }


    const handleIsPinned = () => {
        setIsPinned(!isPinned);

    }

    const onSubmit = () => {


        var noteDetails = {
            title: title,
            takeanote: takeanote,
            trashed: isTrashed,
            archived: isArchived,
            pinned: isPinned,
            color: color,
            reminder: reminder,
            labelname: labelName
        }


        console.log(noteDetails)
        Controller.takenote(noteDetails).then((res) => {
            console.log("hiii...", res)
            if (res.status === 200) {
                console.log(res.data.message)
            }

        })
        setAbc(false)
    }


    return (
        <div className={classes.root}>
            {/* {
                expansi
            } */}
            {!abc || val ?
                <ExpansionPanel style={{ width: '550px' }}>

                    <Grid item xs={12}>

                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <InputBase style={{ color: 'black', fontWeight: 'bolder', fontSize: '17px', paddingTop: '1px' }} placeholder={pholder} onClick={() => setPholder("Title")} fullWidth="true" value={title} className={classes.heading} onChange={onChangeTitle}></InputBase>

                            {isPinned ?
                                <Grid style={{
                                    paddingLeft: '42px',
                                    marginTop: '-15px'
                                }} item xs={1}>
                                    <Tooltip color="#424242" title="Unpin note" arrow>
                                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                            <img src={Unpin} onClick={handleIsPinned} /> </IconButton>
                                    </Tooltip>
                                </Grid>
                                : <Grid style={{
                                    paddingLeft: '42px',
                                    marginTop: '-15px'
                                }} item xs={1}>
                                    <Tooltip color="#424242" title="Pin note" arrow>
                                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"> <img src={Pin} onClick={handleIsPinned} /></IconButton></Tooltip>
                                </Grid>}

                        </ExpansionPanelSummary>
                    </Grid>
                    <ExpansionPanelDetails style={{ paddingBottom: '73px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <InputBase style={{ color: '#424242', fontWeight: 'bold', fontSize: '17px', paddingTop: '1px', margin: 'none' }} className={classes.textborder} placeholder="Take a note..." multiline="true" fullWidth="true"
                                    value={takeanote} className={classes.heading} onChange={onChangeTakeanote} />
                            </Grid>
                            <Grid style={{ marginBottom: '-10px' }} item xs={12}>
                                <Toolbar style={{
                                    marginLeft: '7px',
                                    marginRight: '433px',
                                    paddingBottom: '-10px',
                                    marginBottom: '-113px'
                                }} variant="dense">
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <Tooltip title="Remind me" arrow>
                                            <AddAlertTwoToneIcon style={{ fontSize: '19px' }} />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <Tooltip title="Collaborator" arrow>
                                            <PersonAddTwoToneIcon style={{ fontSize: '19px' }} />
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <Tooltip title="Change color" arrow>

                                            <ColorLensTwoToneIcon style={{ fontSize: '19px' }} />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <Tooltip title="Archive" arrow>

                                            <ArchiveTwoToneIcon style={{ fontSize: '19px' }} />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <Tooltip title="More" arrow>

                                            <MoreVertTwoToneIcon style={{ fontSize: '19px' }} />
                                        </Tooltip>
                                    </IconButton>

                                    <Grid style={{
                                        paddingLeft: '183px',
                                        paddingRight: '15px'
                                    }}>

                                        <Tooltip title="Close" arrow>

                                            <Button color="primary"
                                                disabled={openflag}
                                                color="#424242"
                                                size="small"
                                                onClick={onSubmit}
                                                className={classes.button}
                                                startIcon={<CancelTwoToneIcon />}
                                            >close</Button>

                                        </Tooltip>
                                    </Grid>

                                </Toolbar>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>

                </ExpansionPanel>
                : ""}
        </div >
    );
}


