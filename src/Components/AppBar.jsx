import React, { Fragment, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import { MenuItem, Grid, Tooltip } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
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
import Card from "@material-ui/core/Card";
import Loader from "react-loader-spinner";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewCompactRoundedIcon from "@material-ui/icons/ViewCompactRounded";
import "../Notes.css";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import ProfilePicture from "./ProfilePicture";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const drawerWidth = 244;

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
    top: "79px",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  palette: {
    backgroundColor: "#fafafa",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
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
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));

export default function PrimarySearchAppBar(props) {
  let owner = localStorage.getItem("owner");
  let tooltip1 = "fundoo account : ";
  let tooltippic = tooltip1.concat(owner);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(props.profilePicture);
  const [searchPlace, setsearchPlace] = useState("Search");
  const [changePic, setchangePic] = useState(false);
  const [view, setview] = useState(false);

  // useEffect(
  //   (props) => {
  //     setProfilePicture(profilePicture);
  //   },
  //   [profilePicture]
  // );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleViewAppbar = () => {
    setview(!view);
    props.handleView();
  };
  const handleEditPicture = async () => {
    await setchangePic(!changePic);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClickAway = async () => {
    setchangePic(false);
    setAnchorEl(null);
    console.log("the picture URL :", props.profilePicture);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      id="profile-popover"
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClickAway}
    >
      <Card id="card_decor8">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
              paddingBottom: "5px",
            }}
          >
            <Badge
              badgeContent={
                <div>
                  <Tooltip title="Edit" placement="right">
                    <IconButton onClick={handleEditPicture}>
                      <AddAPhotoRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <div>
                <Avatar
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  src={props.profilePicture}
                  onClick={handleProfileMenuOpen}
                  className={classes.large}
                />
                {/* <img
                  src={profilePicture}
                  style={{
                    height: "2cm",
                    width: "2cm",
                    borderRadius: "50%",
                    border: "2px solid grey",
                  }}
                /> */}
              </div>
            </Badge>
          </div>
          <div className="profilepic-owner">
            <span style={{ fontWeight: "bold" }}>{owner}</span>
          </div>
          {changePic ? (
            <div>
              <Divider />
              <Toolbar id="profile-toolbar">
                <ProfilePicture />
              </Toolbar>
            </div>
          ) : null}
          <Divider />
          <div className="signout-button-div">
            <button onClick={props.handleSignout} className="signout-button">
              Sign Out
            </button>
          </div>
        </div>
      </Card>
    </Popover>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.palette}>
        <Toolbar>
          <div id="appbar-outerdiv">
            <div
              style={{ width: "3%", paddingTop: "11px", marginLeft: "-23px" }}
            >
              <IconButton
                aria-label="open drawer"
                className={clsx(classes.menuButton, open)}
                onClick={props.handleDraweropen}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className="img-logo">
              <img
                src={
                  "https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
                }
                alt="Logo"
              />
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                justifyContent: "start",
                marginLeft: "-8px",
              }}
            >
              <Typography
                style={{
                  color: "#616161",
                  fontSize: "150%",
                  paddingTop: "15px",
                }}
                className={classes.title}
                variant="h6"
                noWrap
              >
                {props.heading}
              </Typography>
            </div>
            <div className="note-buttonapp" style={{ width: "68%" }}>
              <Card id="card_decorapp">
                <div className="search-align">
                  <div className="search_icon">
                    <IconButton onClick={props.handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </div>
                  <div className="search_input">
                    <InputBase
                      id="inputbase-search"
                      inputProps={{ "aria-label": "description" }}
                      spellCheck={false}
                      placeholder={searchPlace}
                      onChange={props.onChangeSearchInput}
                      onClick={props.handleSearchClick}
                    />
                  </div>
                  {props.searchOpen ? (
                    <div className="searchclose_icon">
                      <IconButton onClick={props.handleSearchCloseClick}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </div>
                  ) : null}
                </div>
              </Card>
            </div>

            <div
              style={{
                width: "14%",
                paddingTop: "5px",
                display: "flex",
                justifyContent: "space-around",
                paddingRight: "10px",
              }}
            >
              <div>
                <Tooltip title="Refresh">
                  <IconButton onClick={props.handleRefresh}>
                    <RefreshOutlinedIcon
                      style={{ color: "#616161" }}
                      id="refresh-icon"
                    />
                  </IconButton>
                </Tooltip>
              </div>
              {!view ? (
                <div>
                  <Tooltip title="List View">
                    <IconButton onClick={handleViewAppbar}>
                      <ViewListRoundedIcon
                        style={{ color: "#616161" }}
                        id="refresh-icon"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip title="Grid View">
                    <IconButton onClick={handleViewAppbar}>
                      <ViewCompactRoundedIcon
                        style={{ color: "#616161" }}
                        id="refresh-icon"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className="avatar-icon">
                <Tooltip title={tooltippic}>
                  <Avatar
                    edge="end"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    src={props.profilePicture}
                    onClick={handleProfileMenuOpen}
                    fontSize="large"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
