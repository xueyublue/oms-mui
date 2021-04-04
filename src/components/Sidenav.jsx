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
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Sidenav = () => {
  const classes = useStyles();
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedMenuIndex(index);
  };

  const handleListGroupClick = () => {
    setOpen(!open);
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
          {/* Performance */}
          <ListItem button onClick={handleListGroupClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Performance"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                selected={selectedMenuIndex == 11}
                onClick={(event) => handleListItemClick(event, 11)}
              >
                <ListItemText primary="Top SQL" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                selected={selectedMenuIndex == 12}
                onClick={(event) => handleListItemClick(event, 12)}
              >
                <ListItemText primary="Disk" />
              </ListItem>
            </List>
          </Collapse>
          <Link to="/setting" className={classes.link}>
            <ListItem
              button
              selected={selectedMenuIndex == 80}
              onClick={(event) => handleListItemClick(event, 80)}
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
