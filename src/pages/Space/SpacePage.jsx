import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { AppBar, Tabs, Tab } from "@material-ui/core";

import { setCurrentTab } from "../../store/ui/space";
import Tablespace from "./Tablespace";
import TopTables from "./TopTables";
import TopIndexes from "./TopIndexes";
import TableRecords from "./TableRecords";
import { loadTablespace, loadTopTables, loadTopIndexes, loadTableRecords } from "./../../store/oracle/space";
import { sidenavSelected } from "../../store/ui/sidenav";
import TabPanel from "./../../components/common/TabPanel";

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
const SpacePage = () => {
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 13 }));
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.space.currentTab);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
    if (currentTab === newValue && newValue === 0) dispatch(loadTablespace());
    if (currentTab === newValue && newValue === 1) dispatch(loadTopTables());
    if (currentTab === newValue && newValue === 2) dispatch(loadTopIndexes());
    if (currentTab === newValue && newValue === 3) dispatch(loadTableRecords());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
          <Tab label="Tablespace" {...a11yProps(0)} />
          <Tab label="Top Tables" {...a11yProps(1)} />
          <Tab label="Top Indexes" {...a11yProps(2)} />
          <Tab label="Table Records" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <Tablespace />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <TopTables />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <TopIndexes />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <TableRecords />
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default SpacePage;
