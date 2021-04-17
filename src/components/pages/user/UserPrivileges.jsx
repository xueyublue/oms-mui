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
import { TablePagination } from "@material-ui/core";

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadUserPrivileges } from "./../../../store/oracle/user";
import {
  userPrivilegesUserNameChanged,
  userPrivilegesPageChanged,
  userPrivilegesPageSizeChanged,
} from "../../../store/ui/user";

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
  let users = [];
  data.map((row) => users.push(row.userName));
  return [...new Set(users)];
};

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const UserPrivileges = () => {
  // call API
  useEffect(() => {
    dispatch(loadUserPrivileges());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.userPrivileges.list);
  const userNames = getDistinctUserNames(tableData);
  const selectedUserName = useSelector((state) => state.ui.user.userPrivileges.selectedUserName);
  const pageSize = useSelector((state) => state.ui.user.userPrivileges.pageSize);
  const currentPage = useSelector((state) => state.ui.user.userPrivileges.currentPage);

  const handleUserNameChange = (event) => {
    dispatch(userPrivilegesUserNameChanged({ selectedUserName: event.target.value }));
    dispatch(userPrivilegesPageChanged({ currentPage: 0 }));
  };
  const handlePageChange = (event, newPage) => {
    dispatch(userPrivilegesPageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(userPrivilegesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(userPrivilegesPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="table-records-label-owner">User&nbsp;Name</InputLabel>
        <Select
          labelId="table-records-label-owner"
          id="table-records-select-owner"
          value={selectedUserName}
          onChange={handleUserNameChange}
        >
          {userNames.map((userName) => (
            <MenuItem dense={true} value={userName} key={userName}>
              {userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100]}
        component="div"
        count={
          tableData.filter((row) => (selectedUserName.length === 0 ? true : row.userName === selectedUserName)).length
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
            <TableCellHeader>User&nbsp;Name</TableCellHeader>
            <TableCellHeader>Privilege</TableCellHeader>
            <TableCellHeader>Admin&nbsp;Option</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedUserName.length === 0 ? true : row.userName === selectedUserName))
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + currentPage * pageSize + 1}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.privilege}</TableCell>
                <TableCell>{row.adminOption}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserPrivileges;
