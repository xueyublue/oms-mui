import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import theme from ".././theme";

const drawerWidth = 200;
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
  icon: {
    minWidth: 30,
    paddingLeft: 0,
    color: theme.palette.common.white,
  },
  listItem: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  listItemSelected: {
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
}));

const StyledListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
    "&$selected:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
  selected: {},
})(ListItem);

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
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon className={classes.icon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </StyledListItem>
          </Link>
          <Divider />
          <Link to="/spaceManager" className={classes.link}>
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
            >
              <ListItemIcon className={classes.icon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Space Manager"} />
            </StyledListItem>
          </Link>
          <Link to="/sessionManager" className={classes.link}>
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
            >
              <ListItemIcon className={classes.icon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Session Manager"} />
            </StyledListItem>
          </Link>
          <Link to="/setting" className={classes.link}>
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 80}
              onClick={(event) => handleListItemClick(event, 80)}
            >
              <ListItemIcon className={classes.icon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </StyledListItem>
          </Link>
          <Link to="/about" className={classes.link}>
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 99}
              onClick={(event) => handleListItemClick(event, 99)}
            >
              <ListItemIcon className={classes.icon}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </StyledListItem>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidenav;
