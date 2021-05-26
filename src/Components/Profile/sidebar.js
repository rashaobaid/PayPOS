import React from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link, Route, useLocation } from "react-router-dom";
import Settings from "./Settings";
import PersonalInfo from "./PersonalInfo";
import Activites from "./Activites";
import { AccountCircle, PlaylistAddCheck } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    position: "relative",
    top: "72px",
    borderRadius: "6px",
    border: "1px solid #dfdfdf",
    boxShadow: "5px 5px 5px #efefefef",
    height: "300px",
  },
  content: {
    position: "relative",
    top: "66px",
    padding: 15,
    width: "100%",
  },
  listItem: {
    "& .MuiListItem-gutters": {
      paddingBottom: "24px",
    },
  },
  active: {
    color: "white",
    backgroundColor: "#753ee7",
    "&:hover": {
      backgroundColor: "#753ee7",
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  //get current location
  const location = useLocation();
  const icons = [<AccountCircle />, <SettingsIcon />, <PlaylistAddCheck />];
  const drawer = (
    <div>
      <List>
        {["Info", "Settings", "Activites"].map((text, index) => {
          const isActive =
            location.pathname === `/profile/${text.toLowerCase()}`
              ? classes.active
              : "";
          return (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/profile/${text.toLowerCase()}`}
              className={`${classes.listItem} ${isActive}`} // add class if location == `/profile/${text.toLowerCase()}`
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText
                primary={text === "Info" ? "Personal Info" : text}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="permanent"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <Route exact path="/profile/info" component={PersonalInfo} />
        <Route exact path="/profile/settings" component={Settings} />
        <Route exact path="/profile/activites" component={Activites} />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
