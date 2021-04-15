import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidenavSelected } from "../../store/ui/sidenav";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, LinearProgress, AppBar, Tabs, Tab, TablePagination } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { loadOwners, loadTableRecords, loadTablespace, loadTopTables } from "../../store/oracle/space";
import {
  setCurrentTab,
  topTablesOwnerChanged,
  topTablesDisplayLimitChanged,
  topTablesPageChanged,
  topTablesPageSizeChanged,
  topIndexesOwnerChanged,
  topIndexesDisplayLimitChanged,
  topIndexesPageChanged,
  topIndexesPageSizeChanged,
  tableRecordsOwnerChanged,
  tableRecordsPageChanged,
  tableRecordsPageSizeChanged,
} from "../../store/ui/spaceManager";
import TabPanel from "./../common/TabPanel";
import { loadTopIndexes } from "./../../store/oracle/space";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const TableCellHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    width: 100,
    backgroundColor: theme.palette.light.grey,
  },
  bar: {
    borderRadius: 1,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SpaceManager = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 13 }));
    dispatch(loadTablespace());
    dispatch(loadOwners());
    dispatch(loadTopTables());
    dispatch(loadTopIndexes());
    dispatch(loadTableRecords());
  });
  // Data from Redux Store
  const currentTab = useSelector((state) => state.ui.spaceManager.currentTab);
  const tablespaceData = useSelector((state) => state.oracle.space.tablespace.list);
  const ownersData = useSelector((state) => state.oracle.space.owners.list);
  const topTablesData = useSelector((state) => state.oracle.space.topTables.list);
  const topIndexesData = useSelector((state) => state.oracle.space.topIndexes.list);
  const tableRecordsData = useSelector((state) => state.oracle.space.tableRecords.list);
  // UI Data
  const topTablesSelectedOwner = useSelector((state) => state.ui.spaceManager.topTables.selectedOwner);
  const topTablesSelectedDisplayLimit = useSelector((state) => state.ui.spaceManager.topTables.selectedDisplayLimit);
  const topTablesPageSize = useSelector((state) => state.ui.spaceManager.topTables.pageSize);
  const topTablesCurrentPage = useSelector((state) => state.ui.spaceManager.topTables.currentPage);
  const topIndexesSelectedOwner = useSelector((state) => state.ui.spaceManager.topIndexes.selectedOwner);
  const topIndexesSelectedDisplayLimit = useSelector((state) => state.ui.spaceManager.topIndexes.selectedDisplayLimit);
  const topIndexesPageSize = useSelector((state) => state.ui.spaceManager.topIndexes.pageSize);
  const topIndexesCurrentPage = useSelector((state) => state.ui.spaceManager.topIndexes.currentPage);
  const tableRecordsSelectedOwner = useSelector((state) => state.ui.spaceManager.tableRecords.selectedOwner);
  const tableRecordsPageSize = useSelector((state) => state.ui.spaceManager.tableRecords.pageSize);
  const tableRecordsCurrentPage = useSelector((state) => state.ui.spaceManager.tableRecords.currentPage);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
  };

  const handleTopTablesOwnerChange = (event) => {
    dispatch(topTablesOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };
  const handleTopTablesDisplayLimitChange = (event) => {
    dispatch(topTablesDisplayLimitChanged({ selectedDisplayLimit: event.target.value }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };
  const handleTopTablesCurrentPageChange = (event, newPage) => {
    dispatch(topTablesPageChanged({ currentPage: newPage }));
  };
  const handleTopTablesPageSizeChange = (event) => {
    dispatch(topTablesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };

  const handleTopIndexesOwnerChange = (event) => {
    dispatch(topIndexesOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handleTopIndexesDisplayLimitChange = (event) => {
    dispatch(topIndexesDisplayLimitChanged({ selectedDisplayLimit: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handleTopIndexesCurrentPageChange = (event, newPage) => {
    dispatch(topIndexesPageChanged({ currentPage: newPage }));
  };
  const handleTopIndexesPageSizeChange = (event) => {
    dispatch(topIndexesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };

  const handleTableRecordsOwnerChange = (event) => {
    dispatch(tableRecordsOwnerChanged({ selectedOwner: event.target.value }));
  };
  const handleTableRecordsCurrentPageChange = (event, newPage) => {
    dispatch(tableRecordsPageChanged({ currentPage: newPage }));
  };
  const handleTableRecordsPageSizeChange = (event) => {
    dispatch(tableRecordsPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(tableRecordsPageChanged({ currentPage: 0 }));
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
          <Tab label="Tablespace" {...a11yProps(0)} />
          <Tab label="Top Tables" {...a11yProps(1)} />
          <Tab label="Top Indexes" {...a11yProps(2)} />
          <Tab label="Table Records" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <TabPanel value={currentTab} index={0}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
                <TableCellHeader>Tablespace</TableCellHeader>
                <TableCellHeader>Path</TableCellHeader>
                <TableCellHeader>Status</TableCellHeader>
                <TableCellHeader align="right">Size&nbsp;(MB)</TableCellHeader>
                <TableCellHeader align="right">Free&nbsp;Size&nbsp;(MB)</TableCellHeader>
                <TableCellHeader align="right">Occupancy</TableCellHeader>
                <TableCellHeader align="right">Next&nbsp;Extend&nbsp;(MB)</TableCellHeader>
                <TableCellHeader>Contents</TableCellHeader>
                <TableCellHeader>Allocation&nbsp;Type</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {tablespaceData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.index}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.path}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="right">{row.size}</TableCell>
                  <TableCell align="right">{row.freeSize}</TableCell>
                  <TableCell align="right">
                    <Box display="flex" alignItems="center">
                      <Box>
                        <BorderLinearProgress
                          className={classes.margin}
                          variant="determinate"
                          color="secondary"
                          value={row.occupancy}
                        />
                      </Box>
                      <Box minWidth={30}>{row.occupancy}%</Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.nextExtend}</TableCell>
                  <TableCell>{row.contents}</TableCell>
                  <TableCell>{row.allocationType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <FormControl className={classes.formControl}>
            <InputLabel id="top-tables-label-owner">Owner</InputLabel>
            <Select
              labelId="top-tables-label-owner"
              id="top-tables-select-owner"
              value={topTablesSelectedOwner}
              onChange={handleTopTablesOwnerChange}
            >
              {ownersData.map((owner) => (
                <MenuItem dense={true} value={owner} key={owner}>
                  {owner}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="top-tables-label-display-limit">Display Limit</InputLabel>
            <Select
              labelId="top-tables-label-display-limit"
              id="top-tables-select-display-limit"
              value={topTablesSelectedDisplayLimit}
              onChange={handleTopTablesDisplayLimitChange}
            >
              <MenuItem dense={true} value={50}>
                50
              </MenuItem>
              <MenuItem dense={true} value={100}>
                100
              </MenuItem>
              <MenuItem dense={true} value={500}>
                500
              </MenuItem>
              <MenuItem dense={true} value={1000}>
                1000
              </MenuItem>
            </Select>
          </FormControl>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={
              topTablesData
                .filter((row) => (topTablesSelectedOwner.length === 0 ? true : row.owner === topTablesSelectedOwner))
                .slice(0, topTablesSelectedDisplayLimit).length
            }
            rowsPerPage={topTablesPageSize}
            page={topTablesCurrentPage}
            onChangePage={handleTopTablesCurrentPageChange}
            onChangeRowsPerPage={handleTopTablesPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>Owner</TableCellHeader>
                <TableCellHeader>Segment&nbsp;Name</TableCellHeader>
                <TableCellHeader align="right">Segment&nbsp;Size&nbsp;(MB)</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {topTablesData
                .filter((row) => (topTablesSelectedOwner.length === 0 ? true : row.owner === topTablesSelectedOwner))
                .slice(0, topTablesSelectedDisplayLimit)
                .slice(
                  topTablesCurrentPage * topTablesPageSize,
                  topTablesCurrentPage * topTablesPageSize + topTablesPageSize
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + topTablesCurrentPage * topTablesPageSize + 1}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.segmentName}</TableCell>
                    <TableCell align="right">{row.segmentSize}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="top-indexes-label-owner">Owner</InputLabel>
            <Select
              labelId="top-indexes-label-owner"
              id="top-indexes-select-owner"
              value={topIndexesSelectedOwner}
              onChange={handleTopIndexesOwnerChange}
            >
              {ownersData.map((owner) => (
                <MenuItem dense={true} value={owner} key={owner}>
                  {owner}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="top-indexes-label-display-limit">Display Limit</InputLabel>
            <Select
              labelId="top-indexes-label-display-limit"
              id="top-indexes-select-display-limit"
              value={topIndexesSelectedDisplayLimit}
              onChange={handleTopIndexesDisplayLimitChange}
            >
              <MenuItem dense={true} value={50}>
                50
              </MenuItem>
              <MenuItem dense={true} value={100}>
                100
              </MenuItem>
              <MenuItem dense={true} value={500}>
                500
              </MenuItem>
              <MenuItem dense={true} value={1000}>
                1000
              </MenuItem>
            </Select>
          </FormControl>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={
              topIndexesData
                .filter((row) => (topIndexesSelectedOwner.length === 0 ? true : row.owner === topIndexesSelectedOwner))
                .slice(0, topIndexesSelectedDisplayLimit).length
            }
            rowsPerPage={topIndexesPageSize}
            page={topIndexesCurrentPage}
            onChangePage={handleTopIndexesCurrentPageChange}
            onChangeRowsPerPage={handleTopIndexesPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>Owner</TableCellHeader>
                <TableCellHeader>Segment&nbsp;Name</TableCellHeader>
                <TableCellHeader align="right">Segment&nbsp;Size&nbsp;(MB)</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {topIndexesData
                .filter((row) => (topIndexesSelectedOwner.length === 0 ? true : row.owner === topIndexesSelectedOwner))
                .slice(0, topIndexesSelectedDisplayLimit)
                .slice(
                  topIndexesCurrentPage * topIndexesPageSize,
                  topIndexesCurrentPage * topIndexesPageSize + topIndexesPageSize
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + topIndexesCurrentPage * topIndexesPageSize + 1}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.segmentName}</TableCell>
                    <TableCell align="right">{row.segmentSize}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100]}
            component="div"
            count={tableRecordsData.length}
            rowsPerPage={tableRecordsPageSize}
            page={tableRecordsCurrentPage}
            onChangePage={handleTableRecordsCurrentPageChange}
            onChangeRowsPerPage={handleTableRecordsPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center" style={{ width: 60 }}>
                  #
                </TableCellHeader>
                <TableCellHeader>Table Name</TableCellHeader>
                <TableCellHeader align="right">Total&nbsp;Records</TableCellHeader>
                <TableCellHeader>Tablespace</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRecordsData
                .slice(
                  tableRecordsCurrentPage * tableRecordsPageSize,
                  tableRecordsCurrentPage * tableRecordsPageSize + tableRecordsPageSize
                )
                .map((row) => (
                  <TableRow key={row.index}>
                    <TableCell align="center">{row.index}</TableCell>
                    <TableCell>{row.tableName}</TableCell>
                    <TableCell align="right">{row.totalRecords}</TableCell>
                    <TableCell>{row.tablespace}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default SpaceManager;
