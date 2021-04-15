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

import { loadTableRecords, loadTablespace, loadTopTables } from "../../store/oracle/space";
import {
  setCurrentTab,
  tableRecordsPageChanged,
  tableRecordsPageSizeChanged,
  topIndexesPageChanged,
  topIndexesPageSizeChanged,
  topTablesPageChanged,
  topTablesPageSizeChanged,
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
    dispatch(loadTopTables());
    dispatch(loadTopIndexes());
    dispatch(loadTableRecords());
  });
  // Data from Redux Store
  const currentTab = useSelector((state) => state.ui.spaceManager.currentTab);
  const tablespaceData = useSelector((state) => state.oracle.space.tablespace.list);
  const topTablesData = useSelector((state) => state.oracle.space.topTables.list);
  const topIndexesData = useSelector((state) => state.oracle.space.topIndexes.list);
  const tableRecordsData = useSelector((state) => state.oracle.space.tableRecords.list);
  // Pagination Data
  const topTablesPageSize = useSelector((state) => state.ui.spaceManager.topTables.pageSize);
  const topTablesCurrentPage = useSelector((state) => state.ui.spaceManager.topTables.currentPage);
  const topIndexesPageSize = useSelector((state) => state.ui.spaceManager.topIndexes.pageSize);
  const topIndexesCurrentPage = useSelector((state) => state.ui.spaceManager.topIndexes.currentPage);
  const tableRecordsPageSize = useSelector((state) => state.ui.spaceManager.tableRecords.pageSize);
  const tableRecordsCurrentPage = useSelector((state) => state.ui.spaceManager.tableRecords.currentPage);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab({ currentTab: newValue }));
  };

  const handleTopTablesCurrentPageChange = (event, newPage) => {
    dispatch(topTablesPageChanged({ currentPage: newPage }));
  };
  const handleTopTablesPageSizeChange = (event) => {
    dispatch(topTablesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };

  const handleTopIndexesCurrentPageChange = (event, newPage) => {
    dispatch(topIndexesPageChanged({ currentPage: newPage }));
  };
  const handleTopIndexesPageSizeChange = (event) => {
    dispatch(topIndexesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
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
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={topTablesData.length}
            rowsPerPage={topTablesPageSize}
            page={topTablesCurrentPage}
            onChangePage={handleTopTablesCurrentPageChange}
            onChangeRowsPerPage={handleTopTablesPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
                <TableCellHeader>Owner</TableCellHeader>
                <TableCellHeader>Segment&nbsp;Name</TableCellHeader>
                <TableCellHeader align="right">Segment&nbsp;Size&nbsp;(MB)</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {topTablesData
                .slice(
                  topTablesCurrentPage * topTablesPageSize,
                  topTablesCurrentPage * topTablesPageSize + topTablesPageSize
                )
                .map((row) => (
                  <TableRow key={row.index}>
                    <TableCell align="center">{row.index}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.segmentName}</TableCell>
                    <TableCell align="right">{row.segmentSize}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <TablePagination
            rowsPerPageOptions={[10, 15, 30, 100, 500]}
            component="div"
            count={topIndexesData.length}
            rowsPerPage={topIndexesPageSize}
            page={topIndexesCurrentPage}
            onChangePage={handleTopIndexesCurrentPageChange}
            onChangeRowsPerPage={handleTopIndexesPageSizeChange}
          />
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">#</TableCellHeader>
                <TableCellHeader>Owner</TableCellHeader>
                <TableCellHeader>Segment&nbsp;Name</TableCellHeader>
                <TableCellHeader align="right">Segment&nbsp;Size&nbsp;(MB)</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {topIndexesData
                .slice(
                  topIndexesCurrentPage * topIndexesPageSize,
                  topIndexesCurrentPage * topIndexesPageSize + topIndexesPageSize
                )
                .map((row) => (
                  <TableRow key={row.index}>
                    <TableCell align="center">{row.index}</TableCell>
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
                <TableCellHeader align="center">#</TableCellHeader>
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
