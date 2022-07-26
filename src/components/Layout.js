import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToolBar,
  Avatar,
} from "@material-ui/core";
import {
  AddCircleOutlined,
  Home,
  SubjectOutlined,
  ArrowBack,
  ExitToApp
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginLeft: drawerWidth,
      marginTop: "70px",
    },
    drawer: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      display: "flex",
      justifyContent: "center",
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    logo: { 
      objectFit: "contain",
      width: "250px",
      "&:hover": {
        cursor: "pointer"
      }
    },
    logout: {
        background: "#ffcdd2"
    }
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <div onClick={() => navigate("/")} className={classes.title}>
          <img className={classes.logo} src="blog-logo.PNG" alt=""></img>
        </div>

        <List>
          <ListItem
            button
            onClick={() => navigate("/")}
            className={location.pathname === "/" ? classes.active : null}
          >
            <ListItemIcon>{<Home color="secondary" />}</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/myposts")}
            className={location.pathname === "/myposts" ? classes.active : null}
          >
            <ListItemIcon>{<SubjectOutlined color="secondary" />}</ListItemIcon>
            <ListItemText primary="My Posts" />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/create")}
            className={location.pathname === "/create" ? classes.active : null}
          >
            <ListItemIcon>
              {<AddCircleOutlined color="secondary" />}
            </ListItemIcon>
            <ListItemText primary="Create Post" />
          </ListItem>

          {currentUser && (
            <ListItem className={classes.logout} button onClick={handleLogout}>
              <ListItemIcon>{<ArrowBack color="secondary" />}</ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem> 
          )}

          {!currentUser && (
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemIcon>{<ExitToApp color="secondary" />}</ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItem> 
          )}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
};
export default Layout;
