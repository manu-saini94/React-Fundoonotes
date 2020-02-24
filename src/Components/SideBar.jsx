import React from 'react'
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import NotesIcon from '@material-ui/icons/Notes';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { fade, makeStyles } from '@material-ui/core/styles';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const drawerWidth = 244;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        top: "79px",
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
      palette: {
        backgroundColor: '#fafafa'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(2),
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: '#424242'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
export default function SideNavBar(props) {
    const classes = useStyles();
    { console.log(props.show) }
    return (

        <Drawer
            position="fixed"
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.show}
            classes={{
                paper: classes.drawerPaper
            }}
        >

            <Divider />

            <List>
                <ListItem style={{ marginTop: '-2%' }} button key="Notes">
                    <ListItemIcon style={{ paddingTop: '2%', fontWeight: 'bolder', marginBottom: '-2%', marginRight: '59%' }}>
                        <NotesIcon style={{ paddingTop: '4%' }} /> <ListItemText style={{ paddingLeft: '50%', paddingBottom: '2%', fontFamily: 'Arial', fontWeight: 'bolder', color: '#212121', marginBottom: '12%', fontSizeAdjust: 'inherit' }} >Notes</ListItemText>
                    </ListItemIcon>
                </ListItem>

            </List>
            <List>
                <ListItem style={{ marginTop: '-6%' }} button key="Reminders">
                    <ListItemIcon
                        style={{ paddingTop: '2%', fontWeight: 'bolder', marginBottom: '-2%', marginRight: '59%' }}>
                        <NotificationsOutlinedIcon style={{ marginTop: '-15%' }} />
                    </ListItemIcon>
                    <ListItemText style={{ width: '100%', marginLeft: '-59%' }} >Reminders</ListItemText>

                </ListItem>

            </List>
            <Divider />
            <List>
                <h5 style={{ fontWeight: '20', paddingRight: '64%', marginTop: '5%' }}>LABELS</h5>
                <ListItem style={{ marginTop: '-6%' }} button key="Edit Labels">
                    <ListItemIcon className style={{ paddingTop: '-2%', fontWeight: 'bolder', marginBottom: '0.9%' }}>
                        <EditOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText style={{ width: '100%' }} >Edit Labels</ListItemText>
                </ListItem>

            </List>

            <Divider />
            <List>
                <ListItem style={{ marginTop: '-1%' }} button key="Archive">
                    <ListItemIcon className style={{ paddingTop: '-2%', fontWeight: 'bolder', marginBottom: '-2%', marginRight: '59%' }}>
                        <ArchiveOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText style={{ width: '100%', marginLeft: '-59%', marginTop: '4%' }} >Archive</ListItemText>
                </ListItem>

            </List>
            <List>
                <ListItem style={{ marginTop: '-6%' }} button key="Trash">
                    <ListItemIcon className style={{ paddingTop: '-2%', fontWeight: 'bolder', marginBottom: '-2%', marginRight: '59%' }}>
                        <DeleteOutlineIcon />
                    </ListItemIcon>
                    <ListItemText style={{ width: '100%', marginLeft: '-59%', marginTop: '4%' }} >Trash</ListItemText>
                </ListItem>

            </List>


        </Drawer>
    )
}


