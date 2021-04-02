import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const Sidenav = () => {
  const classes = useStyles();
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedMenuIndex(index);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Link to="/" className={classes.link}>
            <ListItem
              button
              selected={selectedMenuIndex == 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/setting" className={classes.link}>
            <ListItem
              button
              selected={selectedMenuIndex == 10}
              onClick={(event) => handleListItemClick(event, 10)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItem>
          </Link>
          <Link to="/about" className={classes.link}>
            <ListItem
              button
              selected={selectedMenuIndex == 99}
              onClick={(event) => handleListItemClick(event, 99)}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItem>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidenav;
