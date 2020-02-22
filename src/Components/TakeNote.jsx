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
        paddingLeft: '474px',
        marginLeft:'18px',
      
       
    },
    heading: {
        fontSize: theme.typography.pxToRem(2),
        fontWeight: theme.typography.fontWeightRegular,
       
    },
}));




export default function SimpleExpansionPanel() {
    const classes = useStyles();
    const [pholder, setpholder] = React.useState("Take a note...");




    return (
        <div className={classes.root}>
            <ExpansionPanel >
                <ExpansionPanelSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <InputBase style={{ color: 'black', fontWeight: 'bolder', fontSize: '17px' ,paddingTop:'1px',paddingBottom:'1px'}} placeholder={pholder} onClick={() => setpholder("Title")} fullWidth="true" className={classes.heading}></InputBase>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ paddingBottom: '73px' }}>
                    <InputBase style={{ color: 'black', fontWeight: 'bolder', fontSize: '17px' }} placeholder="Take a note..." multiline="true" className={classes.heading} fullWidth="true"></InputBase>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}


