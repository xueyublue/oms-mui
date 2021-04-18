import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, Grid, Switch, TablePagination } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { TableCellHeader } from "../../common/TableCellHeader";
import {
  userNameChanged,
  statusChanged,
  pageChanged,
  pageSizeChanged,
  showAllColumnsChanged,
} from "../../../store/ui/session";
import { loadSessions } from "../../../store/oracle/session";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const getDistinctUserNames = (data) => {
  let usernames = [];
  data.map((row) => row.userName && usernames.push(row.userName));
  return ["All", ...new Set(usernames)];
};

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Sessions = () => {
  // call API
  useEffect(() => {
    dispatch(loadSessions());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.session.list);
  const userNames = getDistinctUserNames(tableData);
  const selectedUserName = useSelector((state) => state.ui.session.selectedUserName);
  const selectedStatus = useSelector((state) => state.ui.session.selectedStatus);
  const showAllColumns = useSelector((state) => state.ui.session.showAllColumns);
  const pageSize = useSelector((state) => state.ui.session.pageSize);
  const currentPage = useSelector((state) => state.ui.session.currentPage);

  const handleUserNameChange = (event) => {
    dispatch(userNameChanged({ selectedUserName: event.target.value }));
    dispatch(pageChanged({ currentPage: 0 }));
  };
  const handleStatusChange = (event) => {
    dispatch(statusChanged({ selectedStatus: event.target.value }));
    dispatch(pageChanged({ currentPage: 0 }));
  };
  const handleShowAllColumnsChange = (event) => {
    dispatch(showAllColumnsChanged({ showAllColumns: event.target.checked }));
  };
  const handlePageChange = (event, newPage) => {
    dispatch(pageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(pageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(pageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="label-username">User&nbsp;Name</InputLabel>
            <Select
              labelId="label-username"
              id="select-username"
              value={selectedUserName}
              onChange={handleUserNameChange}
            >
              {userNames.map((username) => (
                <MenuItem dense={true} value={username} key={username} key={username}>
                  {username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="label-status">Status</InputLabel>
            <Select labelId="label-status" id="select-status" value={selectedStatus} onChange={handleStatusChange}>
              {["All", "Active", "Inactive"].map((status) => (
                <MenuItem dense={true} value={status} key={status} key={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Switch checked={showAllColumns} onChange={handleShowAllColumnsChange} /> Show All Columns
        </Grid>
      </Grid>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100, 500]}
        component="div"
        count={
          tableData
            .filter((row) => (selectedUserName === "All" ? true : row.userName === selectedUserName))
            .filter((row) => (selectedStatus === "All" ? true : row.status === selectedStatus)).length
        }
        rowsPerPage={pageSize}
        page={currentPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePageSizeChange}
      />
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>ID</TableCellHeader>
            <TableCellHeader>Serial&nbsp;#</TableCellHeader>
            <TableCellHeader>User&nbsp;Name</TableCellHeader>
            <TableCellHeader>Status</TableCellHeader>
            <TableCellHeader>OS&nbsp;User</TableCellHeader>
            <TableCellHeader>Machine</TableCellHeader>
            <TableCellHeader>Terminal</TableCellHeader>
            <TableCellHeader>Process</TableCellHeader>
            <TableCellHeader>Program</TableCellHeader>
            <TableCellHeader>Client&nbsp;Info</TableCellHeader>
            <TableCellHeader>Logon&nbsp;Time</TableCellHeader>
            {showAllColumns && <TableCellHeader>Action</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Module</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Server</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Type</TableCellHeader>}
            {showAllColumns && <TableCellHeader>SQL&nbsp;Address</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Previous&nbsp;SQL&nbsp;Address</TableCellHeader>}
            {showAllColumns && <TableCellHeader>SQL&nbsp;ID</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Previous&nbsp;SQL&nbsp;ID</TableCellHeader>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedUserName === "All" ? true : row.userName === selectedUserName))
            .filter((row) => (selectedStatus === "All" ? true : row.status === selectedStatus))
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + currentPage * pageSize + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.serialNo}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.osUser}</TableCell>
                <TableCell>{row.machine}</TableCell>
                <TableCell>{row.terminal}</TableCell>
                <TableCell>{row.process}</TableCell>
                <TableCell>{row.program}</TableCell>
                <TableCell>{row.clientInfo}</TableCell>
                <TableCell>{row.logonTime}</TableCell>
                {showAllColumns && <TableCell>{row.action}</TableCell>}
                {showAllColumns && <TableCell>{row.module}</TableCell>}
                {showAllColumns && <TableCell>{row.server}</TableCell>}
                {showAllColumns && <TableCell>{row.type}</TableCell>}
                {showAllColumns && <TableCell>{row.sqlAddress}</TableCell>}
                {showAllColumns && <TableCell>{row.previousSqlAddress}</TableCell>}
                {showAllColumns && <TableCell>{row.sqlId}</TableCell>}
                {showAllColumns && <TableCell>{row.previousSqlId}</TableCell>}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Sessions;
