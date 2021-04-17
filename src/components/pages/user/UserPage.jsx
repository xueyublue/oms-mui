import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidenavSelected } from "../../../store/ui/sidenav";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { AppBar, Tabs, Tab } from "@material-ui/core";

import { setCurrentTab } from "../../../store/ui/user";
import TabPanel from "../../common/TabPanel";
import Profiles from "./Profiles";
import Roles from "./Roles";
import Users from "./Users";
import UserPrivileges from "./UserPrivileges";
import RolePrivileges from "./RolePrivileges";
import {
  loadProfiles,
  loadRoles,
  loadUsers,
  loadRolePrivileges,
  loadUserPrivileges,
} from "./../../../store/oracle/user";

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
const UserPage = () => {
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 15 }));
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.ui.user.currentTab);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
    if (currentTab === newValue && newValue === 0) dispatch(loadProfiles());
    if (currentTab === newValue && newValue === 1) dispatch(loadRoles());
    if (currentTab === newValue && newValue === 2) dispatch(loadUsers());
    if (currentTab === newValue && newValue === 3) dispatch(loadRolePrivileges());
    if (currentTab === newValue && newValue === 4) dispatch(loadUserPrivileges());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Profiles" {...a11yProps(0)} />
          <Tab label="Roles" {...a11yProps(1)} />
          <Tab label="Users" {...a11yProps(2)} />
          <Tab label="Role&nbsp;Privileges" {...a11yProps(3)} />
          <Tab label="User&nbsp;Privileges" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <Profiles />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Roles />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Users />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <RolePrivileges />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <UserPrivileges />
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default UserPage;
