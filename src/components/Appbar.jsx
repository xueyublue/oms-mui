import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Appbar = () => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap>
            Oracle Monitoring System
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
