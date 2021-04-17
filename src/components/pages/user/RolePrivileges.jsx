import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadRolePrivileges } from "./../../../store/oracle/user";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const RolePrivileges = () => {
  // call API
  useEffect(() => {
    dispatch(loadRolePrivileges());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.rolePrivileges.list);

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <TableCellHeader align="center" style={{ width: 60 }}>
            #
          </TableCellHeader>
          <TableCellHeader>Role</TableCellHeader>
          <TableCellHeader>Privilege</TableCellHeader>
          <TableCellHeader>Admin&nbsp;Option</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.privilege}</TableCell>
            <TableCell>{row.adminOption}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RolePrivileges;