import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AppBar, Button, Tab, TablePagination, Tabs } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import {
  loadBanners,
  loadDetails,
  loadParameters,
  loadResourceLimit,
  loadSgaConfig,
} from "../../../store/oracle/instance";
import { sidenavSelected } from "../../../store/ui/sidenav";
import {
  parameterPageChanged,
  parameterPageSizeChanged,
  resourceLimitPageChanged,
  resourceLimitPageSizeChanged,
  setCurrentTab,
} from "../../../store/ui/instanceDetail";
import TabPanel from "../../common/TabPanel";
import InstanceDetails from "./InstanceDetails";
import SgaConfiguration from "./SgaConfiguration";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
}));

const TableCellHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InstancePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 11 }));
    dispatch(loadDetails());
    dispatch(loadSgaConfig());
    dispatch(loadBanners());
    dispatch(loadResourceLimit());
    dispatch(loadParameters());
  });
  // Data from Redux Store
  const currentTab = useSelector((state) => state.ui.instanceDetail.currentTab);
  const bannersData = useSelector((state) => state.oracle.instance.banners.list);
  const resourceLimitData = useSelector((state) => state.oracle.instance.resourceLimit.list);
  const parametersData = useSelector((state) => state.oracle.instance.parameters.list);
  // Pagination Data
  const resourceLimitPageSize = useSelector((state) => state.ui.instanceDetail.resourceLimit.pageSize);
  const resourceLimitCurrentPage = useSelector((state) => state.ui.instanceDetail.resourceLimit.currentPage);
  const parametersPageSize = useSelector((state) => state.ui.instanceDetail.parameters.pageSize);
  const parametersCurrentPage = useSelector((state) => state.ui.instanceDetail.parameters.currentPage);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
  };

  const handleResourceLimitCurrentPageChange = (event, newPage) => {
    dispatch(resourceLimitPageChanged({ currentPage: newPage }));
  };
  const handleResourceLimitPageSizeChange = (event) => {
    dispatch(resourceLimitPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(resourceLimitPageChanged({ currentPage: 0 }));
  };

  const handleParametersCurrentPageChange = (event, newPage) => {
    dispatch(parameterPageChanged({ currentPage: newPage }));
  };
  const handleParametersPageSizeChange = (event) => {
    dispatch(parameterPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(parameterPageChanged({ currentPage: 0 }));
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
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>Banner</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {bannersData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{row.banner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100]}
            component="div"
            count={resourceLimitData.length}
            rowsPerPage={resourceLimitPageSize}
            page={resourceLimitCurrentPage}
            onChangePage={handleResourceLimitCurrentPageChange}
            onChangeRowsPerPage={handleResourceLimitPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>ResourceI&nbsp;Name</TableCellHeader>
                <TableCellHeader>CurrentI&nbsp;Utilization</TableCellHeader>
                <TableCellHeader>MaxI&nbsp;Utilization</TableCellHeader>
                <TableCellHeader>InitialI&nbsp;Allocation</TableCellHeader>
                <TableCellHeader>LimitI&nbsp;Value</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourceLimitData
                .slice(
                  resourceLimitCurrentPage * resourceLimitPageSize,
                  resourceLimitCurrentPage * resourceLimitPageSize + resourceLimitPageSize
                )
                .map((row, index) => (
                  <TableRow key={row.resourceName}>
                    <TableCell align="center">{index + resourceLimitCurrentPage * resourceLimitPageSize + 1}</TableCell>
                    <TableCell>{row.resourceName}</TableCell>
                    <TableCell>{row.currentUtilization}</TableCell>
                    <TableCell>{row.maxUtilization}</TableCell>
                    <TableCell>{row.initialAllocation}</TableCell>
                    <TableCell>{row.limitValue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={parametersData.length}
            rowsPerPage={parametersPageSize}
            page={parametersCurrentPage}
            onChangePage={handleParametersCurrentPageChange}
            onChangeRowsPerPage={handleParametersPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>Name</TableCellHeader>
                <TableCellHeader>Type</TableCellHeader>
                <TableCellHeader>Value</TableCellHeader>
                <TableCellHeader>Description</TableCellHeader>
                <TableCellHeader>Is&nbsp;Default</TableCellHeader>
                <TableCellHeader>Is&nbsp;SessionI&nbsp;Modifiable</TableCellHeader>
                <TableCellHeader>Is&nbsp;SystemI&nbsp;Modifiable</TableCellHeader>
                <TableCellHeader>Is&nbsp;InstanceI&nbsp;Modifiable</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {parametersData
                .slice(
                  parametersCurrentPage * parametersPageSize,
                  parametersCurrentPage * parametersPageSize + parametersPageSize
                )
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{index + parametersCurrentPage * parametersPageSize + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.isDefault}</TableCell>
                    <TableCell>{row.isSessionModifiable}</TableCell>
                    <TableCell>{row.isSystemModifiable}</TableCell>
                    <TableCell>{row.isInstanceModifiable}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default InstancePage;
