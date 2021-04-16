import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";
import { AppBar, Button, Tab, Tabs } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import { sidenavSelected } from "../../../store/ui/sidenav";
import { setCurrentTab } from "../../../store/ui/instanceDetail";
import TabPanel from "../../common/TabPanel";
import InstanceDetails from "./InstanceDetails";
import SgaConfiguration from "./SgaConfiguration";
import Banners from "./Banners";
import ResourceLimit from "./ResourceLimit";
import OracleParameters from "./OracleParameters";

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

const InstancePage = () => {
  // call API
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 11 }));
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.instanceDetail.currentTab);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
  };

  return (
    <div className={classes.root}>
      <Button startIcon={<RefreshIcon />}>Refresh</Button>
      <AppBar position="static" color="inherit">
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Instance Details" {...a11yProps(0)} />
          <Tab label="SGA Configuration" {...a11yProps(1)} />
          <Tab label="Banners" {...a11yProps(2)} />
          <Tab label="Resource Limit" {...a11yProps(3)} />
          <Tab label="Oracle Parameters" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <InstanceDetails />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <SgaConfiguration />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Banners />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <ResourceLimit />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <OracleParameters />
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default InstancePage;
