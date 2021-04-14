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
import { Box, Button, LinearProgress, AppBar, Tabs, Tab } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import { loadTablespace } from "../../store/oracle/space";
import { setCurrentTab } from "../../store/ui/spaceManager";
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
  });

  const currentTab = useSelector((state) => state.ui.spaceManager.currentTab);
  const rows = useSelector((state) => state.oracle.space.tablespace.list);

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
              {rows.map((row) => (
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
          Top Tables
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          Top Indexes
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          Table Records
        </TabPanel>
      </TableContainer>
    </div>
  );
};

export default SpaceManager;
