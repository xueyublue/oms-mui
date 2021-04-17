import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadRoles } from "./../../../store/oracle/user";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Roles = () => {
  // call API
  useEffect(() => {
    dispatch(loadRoles());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.roles.list);

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <TableCellHeader align="center" style={{ width: 60 }}>
            #
          </TableCellHeader>
          <TableCellHeader>Role</TableCellHeader>
          <TableCellHeader>Role&nbsp;ID</TableCellHeader>
          <TableCellHeader>Password&nbsp;Required</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.roleId}</TableCell>
            <TableCell>{row.passwordRequired}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Roles;
