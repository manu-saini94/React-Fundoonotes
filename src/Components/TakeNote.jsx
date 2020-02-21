import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles(theme => ({

    root: {
        border: 1,
        width: '50%',
        paddingLeft: '443px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SimpleExpansionPanel() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <InputBase style={{ color: '#616161', fontWeight: 'bolder', fontSize: '17px' }} placeholder="Take a note…" className={classes.heading}></InputBase>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}


