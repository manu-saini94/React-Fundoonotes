import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SimpleExpansionPanel from './TakeNote'
import clsx from 'clsx';
import { useTheme } from "@material-ui/core/styles";
import CreateReminder from './CreateReminder';


const drawerWidth = 244;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -200
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}))

export default function RemindersMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    // const val = props.noteOpen;
    const handlenoteOpen = () => {

    }
    return (


        <main className={clsx(classes.content, {
            [classes.contentShift]: props.open,
        })}>
            <CreateReminder />

        </main>













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

