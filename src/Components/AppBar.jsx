import React, { Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import { MenuItem, Grid } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RefreshIcon from "@material-ui/icons/Refresh";
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
  },
  palette: {
    backgroundColor: "#fafafa"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing(2),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    color: "#424242"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={props.handleSignout}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.palette}>
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <IconButton
                aria-label="open drawer"
                className={clsx(classes.menuButton, open)}
                onClick={props.handleDraweropen}
              >
                <MenuIcon style={{ color: "#424242" }} />
              </IconButton>
            </Grid>
            <Grid item xs={0}>
              <div>
                <img
                  src={
                    "https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
                  }
                  alt="Logo"
                />
              </div>
            </Grid>
            <Grid item xs={0}>
              <Typography
                style={{ color: "#616161", fontSize: "150%" }}
                className={classes.title}
                variant="h6"
                noWrap
              >
                fundoo
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <div className="note-button">
                <Card id="card_decorapp">
                  <div className="search-align">
                    <div className="search_icon">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </div>
                    <div className="search_input">
                      <InputBase
                        id="inputbase-search"
                        inputProps={{ "aria-label": "description" }}
                        spellCheck={false}
                        // value={this.state.labelName}
                        // onChange={this.onChangeLabelName}
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <RefreshIcon
                  style={{ color: "#424242", paddingBottom: "65%" }}
                />
              </IconButton>
              <IconButton>
                <SettingsIcon
                  style={{ color: "#424242", paddingBottom: "65%" }}
                />
              </IconButton>
              <IconButton
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle
                  style={{ color: "#424242", paddingBottom: "65%" }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
