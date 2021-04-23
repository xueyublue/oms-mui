import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import SpacePage from "./pages/space/SpacePage";
import InstancePage from "./pages/instance/InstancePage";
import UserPage from "./pages/user/UserPage";
import Dashboard from "./../pages/Dashboard/Dashboard";
import About from "./../pages/About/About";
import SessionPage from "./../pages/Session/SessionPage";
import PerformancePage from "./../pages/Performance/PerformancePage";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
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
