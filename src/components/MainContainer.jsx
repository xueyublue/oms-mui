import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Setting from "./pages/Setting";
import SpaceManager from "./pages/SpaceManager";
import InstanceDetail from "./pages/InstanceDetail";

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
          <Route exact path="/instanceDetail" component={InstanceDetail} />
          <Route exact path="/performanceMonitor" component={SpaceManager} />
          <Route exact path="/spaceManager" component={SpaceManager} />
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/about" component={About} />
        </Switch>
      </main>
    </div>
  );
};

export default MainContainer;
