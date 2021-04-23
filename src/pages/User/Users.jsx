import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Grid, Switch } from "@material-ui/core";

import { loadUsers } from "./../../store/oracle/user";
import { usersAccountStatusChanged, usersShowAllColumnsChanged } from "../../store/ui/user";
import { TableCellHeader } from "../../components/TableCellHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const getDistinctAccountStatus = (data) => {
  let accountStatus = [];
  data.map((row) => accountStatus.push(row.accountStatus));
  return ["All", ...new Set(accountStatus)];
};

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Users = () => {
  // call API
  useEffect(() => {
    dispatch(loadUsers());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.users.list);
  const accountStatusList = getDistinctAccountStatus(tableData);
  const selectedAccountStatus = useSelector((state) => state.ui.user.users.selectedAccountStatus);
  const showAllColumns = useSelector((state) => state.ui.user.users.showAllColumns);

  const handleAccountStatusChange = (event) => {
    dispatch(usersAccountStatusChanged({ selectedAccountStatus: event.target.value }));
  };
  const handleShowAllColumnsChange = (event) => {
    dispatch(usersShowAllColumnsChanged({ showAllColumns: event.target.checked }));
  };

  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="label-account-status">Account Status</InputLabel>
            <Select
              labelId="label-account-status"
              id="select-account-status"
              value={selectedAccountStatus}
              onChange={handleAccountStatusChange}
            >
              {accountStatusList.map((accountStatus) => (
                <MenuItem dense={true} value={accountStatus} key={accountStatus}>
                  {accountStatus}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Switch checked={showAllColumns} onChange={handleShowAllColumnsChange} /> Show All Columns
        </Grid>
      </Grid>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>User&nbsp;Name</TableCellHeader>
            <TableCellHeader>User&nbsp;ID</TableCellHeader>
            <TableCellHeader>Account&nbsp;Status</TableCellHeader>
            <TableCellHeader>Profile</TableCellHeader>
            <TableCellHeader>Lock&nbsp;Date</TableCellHeader>
            <TableCellHeader>Expiry&nbsp;Date</TableCellHeader>
            <TableCellHeader>Created&nbsp;Date</TableCellHeader>
            {showAllColumns && <TableCellHeader>Default&nbsp;Tablespace</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Temporary&nbsp;Tablespace</TableCellHeader>}
            {showAllColumns && <TableCellHeader>Last&nbsp;Login&nbsp;Date</TableCellHeader>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedAccountStatus === "All" ? true : row.accountStatus === selectedAccountStatus))
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.accountStatus}</TableCell>
                <TableCell>{row.profile}</TableCell>
                <TableCell>{row.lockDate}</TableCell>
                <TableCell>{row.expiryDate}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
                {showAllColumns && <TableCell>{row.defaultTablespace}</TableCell>}
                {showAllColumns && <TableCell>{row.temporaryTablespace}</TableCell>}
                {showAllColumns && <TableCell>{row.lastLogin}</TableCell>}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
