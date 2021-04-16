import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadUsers } from "./../../../store/oracle/user";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const Users = () => {
  // call API
  useEffect(() => {
    dispatch(loadUsers());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.users.list);

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <TableCellHeader align="center" style={{ width: 60 }}>
            #
          </TableCellHeader>
          <TableCellHeader>User Name</TableCellHeader>
          <TableCellHeader>User&nbsp;ID</TableCellHeader>
          <TableCellHeader>Account&nbsp;Status</TableCellHeader>
          <TableCellHeader>Lock&nbsp;Date</TableCellHeader>
          <TableCellHeader>Expiry&nbsp;Date</TableCellHeader>
          <TableCellHeader>Default&nbsp;Tablespace</TableCellHeader>
          <TableCellHeader>Temporary&nbsp;Tablespace</TableCellHeader>
          <TableCellHeader>Created&nbsp;Date</TableCellHeader>
          <TableCellHeader>Profile</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{row.userName}</TableCell>
            <TableCell>{row.userId}</TableCell>
            <TableCell>{row.accountStatus}</TableCell>
            <TableCell>{row.lockDate}</TableCell>
            <TableCell>{row.expiryDate}</TableCell>
            <TableCell>{row.defaultTablespace}</TableCell>
            <TableCell>{row.temporaryTablespace}</TableCell>
            <TableCell>{row.createdDate}</TableCell>
            <TableCell>{row.profile}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
