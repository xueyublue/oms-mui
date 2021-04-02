import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Sidenav from "./Sidenav";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
