import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SimpleExpansionPanel from './TakeNote'
import clsx from 'clsx';
import { useTheme } from "@material-ui/core/styles";


const drawerWidth = 244;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}))

export default function NotesMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <main className={clsx(classes.content, {
            [classes.contentShift]: props.open,
        })}>
            
            {props.open}
            <SimpleExpansionPanel />
            
        </main>
    )
}


