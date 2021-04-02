import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

const MainContainer = () => {
  const classes = useStyles();
  return (
    <div>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path="/">
            Dashboard
          </Route>
          <Route exact path="/about">
            About
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default MainContainer;
