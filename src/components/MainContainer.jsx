import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import SpacePage from "./pages/SpacePage";
import InstancePage from "./pages/InstancePage";
import PerformancePage from "./pages/PerformancePage";
import SessionPage from "./pages/SessionPage";
import UserPage from "./pages/UserPage";

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
        <Toolbar variant="dense" />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/instance" component={InstancePage} />
          <Route exact path="/performance" component={PerformancePage} />
          <Route exact path="/space" component={SpacePage} />
          <Route exact path="/session" component={SessionPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </main>
    </div>
  );
};

export default MainContainer;
