import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { AppBar, Tabs, Tab } from "@material-ui/core";

import { loadSessions } from "./../../store/oracle/session";
import Sessions from "./Sessions";
import { setCurrentTab } from "../../store/ui/session";
import TabPanel from "../../components/TabPanel";
import { sidenavSelected } from "../../store/ui/sidenav";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const SessionPage = () => {
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 14 }));
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.user.currentTab);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
    if (currentTab === newValue && newValue === 0) dispatch(loadSessions());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
          <Tab label="Session Details" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <Sessions />
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default SessionPage;
