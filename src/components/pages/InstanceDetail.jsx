import React, { useEffect, useState } from "react";
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

import { loadBanners, loadDetails, loadParameters, loadResourceLimit } from "../../store/oracle/instance";
import { sidenavSelected } from "../../store/ui/sidenav";
import { setCurrentTab } from "../../store/ui/instanceDetail";
import TabPanel from "./../common/TabPanel";

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

const InstanceDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 11 }));
    dispatch(loadDetails());
    dispatch(loadBanners());
    dispatch(loadResourceLimit());
    dispatch(loadParameters());
  });

  const currentTab = useSelector((state) => state.ui.instanceDetail.currentTab);
  const detailsData = useSelector((state) => state.oracle.instance.details.list);
  const bannersData = useSelector((state) => state.oracle.instance.banners.list);
  const resourceLimitData = useSelector((state) => state.oracle.instance.resourceLimit.list);
  const parametersData = useSelector((state) => state.oracle.instance.parameters.list);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <Tab label="Banners" {...a11yProps(1)} />
          <Tab label="Resource Limit" {...a11yProps(2)} />
          <Tab label="Oracle Parameters" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader>Field</TableCellHeader>
                <TableCellHeader>Value</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailsData.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
                <TableCellHeader>Banner</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {bannersData.map((row) => (
                <TableRow key={row.index}>
                  <TableCell align="center">{row.index}</TableCell>
                  <TableCell>{row.banner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
                <TableCellHeader>ResourceI&nbsp;Name</TableCellHeader>
                <TableCellHeader>CurrentI&nbsp;Utilization</TableCellHeader>
                <TableCellHeader>MaxI&nbsp;Utilization</TableCellHeader>
                <TableCellHeader>InitialI&nbsp;Allocation</TableCellHeader>
                <TableCellHeader>LimitI&nbsp;Value</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourceLimitData.map((row) => (
                <TableRow key={row.resourceName}>
                  <TableCell align="center">{row.index}</TableCell>
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
        <TabPanel value={currentTab} index={3}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={parametersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
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
              {parametersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.index}</TableCell>
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

export default InstanceDetail;
