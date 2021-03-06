import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import NotesIcon from "@material-ui/icons/Notes";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import { fade, makeStyles } from "@material-ui/core/styles";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CreateLabelNote from "../Components/CreateLabelNote";
import GetNotes from "../Components/GetNotes";

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top: "8.9vh",
    height: "91.1vh",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  palette: {
    backgroundColor: "#fafafa",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    color: "#424242",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function SideNavBar(props) {
  const classes = useStyles();
  const [NoteColor, setNoteColor] = useState(true);
  const [ReminderColor, setReminderColor] = useState(false);
  const [LabelColor, setLabelColor] = useState(false);
  const [ArchiveColor, setArchiveColor] = useState(false);
  const [TrashColor, setTrashColor] = useState(false);
  const [obj3, setObj3] = useState(props.obj3);
  const [obj, setObj] = useState(props.obj);

  const handleLabelNoteMenu123 = (data3) => {
    props.handleLabelNoteMenu(data3);
  };

  let getUserLabels = props.obj3.map((item3) => {
    return (
      <div>
        <List
          onClick={() => {
            handleLabelNoteMenu123(item3.labelname);
          }}
          key={item3.id}
        >
          <ListItem style={{ marginTop: "-9%" }} button key={item3.id}>
            <ListItemIcon
              className
              style={{
                paddingTop: "-2%",
                fontWeight: "bolder",
              }}
            >
              <LabelTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              style={{ width: "100%", fontWeight: "bolder", color: "black" }}
            >
              {item3.labelname}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );
  });

  return (
    <Drawer
      position="fixed"
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.show}
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider />

      <List onClick={props.handleNotesMenu}>
        <ListItem
          style={{ marginTop: "-2%" }}
          button
          key="Notes"
          selected={props.notesOpen}
        >
          <ListItemIcon
            style={{
              paddingTop: "2%",
              fontWeight: "bolder",
              marginBottom: "-2%",
              marginRight: "59%",
            }}
          >
            <NotesIcon style={{ marginTop: "-15%" }} />
          </ListItemIcon>

          <ListItemText style={{ width: "100%", marginLeft: "-59%" }}>
            Notes
          </ListItemText>
        </ListItem>
      </List>

      <List onClick={props.handleRemindersMenu}>
        <ListItem
          style={{ marginTop: "-6%" }}
          button
          key="Reminders"
          selected={props.remindersOpen}
        >
          <ListItemIcon
            style={{
              paddingTop: "2%",
              fontWeight: "bolder",
              marginBottom: "-2%",
              marginRight: "59%",
            }}
          >
            <NotificationsOutlinedIcon style={{ marginTop: "-15%" }} />
          </ListItemIcon>
          <ListItemText style={{ width: "100%", marginLeft: "-59%" }}>
            Reminders
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <h5 style={{ fontWeight: "20", paddingRight: "64%", marginTop: "5%" }}>
        LABELS
      </h5>
      <div>{getUserLabels}</div>
      <List onClick={props.handleEditLabelsMenu}>
        <ListItem style={{ marginTop: "-6%" }} button key="Edit Labels">
          <ListItemIcon
            className
            style={{
              paddingTop: "-2%",
              fontWeight: "bolder",
              marginBottom: "0.9%",
            }}
          >
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText style={{ width: "100%" }}>Edit labels</ListItemText>
        </ListItem>
      </List>

      <Divider />
      <List onClick={props.handleArchiveMenu}>
        <ListItem
          style={{ marginTop: "-1%" }}
          button
          key="Archive"
          selected={props.archiveOpen}
        >
          <ListItemIcon
            className
            style={{
              paddingTop: "-2%",
              fontWeight: "bolder",
              marginBottom: "-2%",
              marginRight: "59%",
            }}
          >
            <ArchiveOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            style={{ width: "100%", marginLeft: "-59%", marginTop: "4%" }}
          >
            Archive
          </ListItemText>
        </ListItem>
      </List>
      <List onClick={props.handleTrashMenu}>
        <ListItem
          style={{ marginTop: "-6%" }}
          button
          key="Trash"
          selected={props.trashOpen}
        >
          <ListItemIcon
            className
            style={{
              paddingTop: "-2%",
              fontWeight: "bolder",
              marginBottom: "-2%",
              marginRight: "59%",
            }}
          >
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText
            style={{ width: "100%", marginLeft: "-59%", marginTop: "4%" }}
          >
            Trash
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
