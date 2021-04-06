import React from "react";
import { Link } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import InfoIcon from "@material-ui/icons/Info";
import { DashboardOutlined, StorageOutlined } from "@material-ui/icons";
import theme from ".././theme";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
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
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

const StyledListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&$selected:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  selected: {},
})(ListItem);

const Sidenav = () => {
  const listItemData = [
    {
      index: 11,
      text: "Instance Detail",
      url: "/instanceDetail",
    },
    {
      index: 12,
      text: "Performance Monitor",
      url: "/performanceMonitor",
    },
    {
      index: 13,
      text: "Space Manager",
      url: "/spaceManager",
    },
    {
      index: 14,
      text: "Session Manager",
      url: "/sessionManager",
    },
    {
      index: 90,
      text: "Setting",
      url: "/setting",
    },
    {
      index: 99,
      text: "About",
      url: "/about",
    },
  ];

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
        <Toolbar variant="dense" />
        <div className={classes.drawerContainer}>
          <Link to="/" className={classes.link}>
            <StyledListItem
              className={classes.listItem}
              button
              selected={selectedMenuIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon className={classes.icon}>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </StyledListItem>
          </Link>
          <Divider />
          {listItemData.map((item) => (
            <Link to={item.url} className={classes.link}>
              <StyledListItem
                className={classes.listItem}
                button
                selected={selectedMenuIndex === item.index}
                onClick={(event) => handleListItemClick(event, item.index)}
              >
                <ListItemIcon className={classes.icon}>
                  {
                    (item.url = "spaceManager" ? (
                      <StorageOutlined />
                    ) : (
                      <InfoIcon />
                    ))
                  }
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItem>
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Sidenav;
