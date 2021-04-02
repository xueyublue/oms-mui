import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Sidenav from "./Sidenav";
import Main from "./Main";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function Container() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Appbar />
      <Sidenav />
      <Main />
    </div>
  );
}
