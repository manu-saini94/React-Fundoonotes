import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TextField, Toolbar, Grid } from '@material-ui/core';
import AddAlertTwoToneIcon from '@material-ui/icons/AddAlertTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import ColorLensTwoToneIcon from '@material-ui/icons/ColorLensTwoTone';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveTwoTone';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';

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




export default function SimpleExpansionPanel() {
    const classes = useStyles();
    const [pholder, setPholder] = React.useState("Take a note...");
    const [openflag, setOpenflag] = React.useState(true);
    const [title, setTitle] = React.useState("");
    useEffect(() => {
        if (title !== "") {
            setOpenflag(false);
        } else {
            setOpenflag(true);
        }
    }, [title])
    const onChangeTitle = event => {
        setTitle(event.target.value);
        console.log(title)
        console.log(openflag)

    }


    return (
        <div className={classes.root}>

            <ExpansionPanel style={{ width: '550px' }}>
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <InputBase style={{ color: 'black', fontWeight: 'bolder', fontSize: '17px', paddingTop: '1px' }} placeholder={pholder} onClick={() => setPholder("Title")} fullWidth="true" value={title} className={classes.heading} onChange={onChangeTitle}></InputBase>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ paddingBottom: '73px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <InputBase style={{ color: '#424242', fontWeight: 'bold', fontSize: '17px', paddingTop: '1px' }} className={classes.textborder} placeholder="Take a note..." multiline="true" fullWidth="true" className={classes.heading} />
                        </Grid>
                        <Grid style={{ marginBottom: '-10px' }} item xs={12}>
                            <Toolbar style={{
                                marginLeft: '7px',
                                marginRight: '433px',
                                paddingBottom: '-10px',
                                marginBottom: '-113px'
                            }} variant="dense">
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <AddAlertTwoToneIcon style={{ fontSize: '19px' }} />
                                </IconButton>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <PersonAddTwoToneIcon style={{ fontSize: '19px' }} />
                                </IconButton>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <ColorLensTwoToneIcon style={{ fontSize: '19px' }} />
                                </IconButton>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <ArchiveTwoToneIcon style={{ fontSize: '19px' }} />
                                </IconButton>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <MoreVertTwoToneIcon style={{ fontSize: '19px' }} />
                                </IconButton>

                                <Grid style={{
                                    paddingLeft: '183px',
                                    paddingRight: '15px'
                                }}>


                                    <Button color="primary"
                                        disabled={openflag}
                                        color="#424242"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<CancelTwoToneIcon />}>close</Button>


                                </Grid>

                            </Toolbar>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}


