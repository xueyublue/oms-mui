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

import {
  rolePrivilegesUserNameChanged,
  rolePrivilegesPageChanged,
  rolePrivilegesPageSizeChanged,
} from "../../store/ui/user";
import { loadRolePrivileges } from "./../../store/oracle/user";
import { TableCellHeader } from "./../../components/common/TableCellHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const getDistinctRoles = (data) => {
  let roles = [];
  data.map((row) => roles.push(row.role));
  return ["All", ...new Set(roles)];
};

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const RolePrivileges = () => {
  // call API
  useEffect(() => {
    dispatch(loadRolePrivileges());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.rolePrivileges.list);
  const roles = getDistinctRoles(tableData);
  const selectedRole = useSelector((state) => state.ui.user.rolePrivileges.selectedRole);
  const pageSize = useSelector((state) => state.ui.user.rolePrivileges.pageSize);
  const currentPage = useSelector((state) => state.ui.user.rolePrivileges.currentPage);

  const handleRoleChange = (event) => {
    dispatch(rolePrivilegesUserNameChanged({ selectedRole: event.target.value }));
    dispatch(rolePrivilegesPageChanged({ currentPage: 0 }));
  };
  const handlePageChange = (event, newPage) => {
    dispatch(rolePrivilegesPageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(rolePrivilegesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(rolePrivilegesPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-role">Role</InputLabel>
        <Select labelId="label-role" id="select-role" value={selectedRole} onChange={handleRoleChange}>
          {roles.map((role) => (
            <MenuItem dense={true} value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100]}
        component="div"
        count={tableData.filter((row) => (selectedRole === "All" ? true : row.role === selectedRole)).length}
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
            <TableCellHeader>Role</TableCellHeader>
            <TableCellHeader>Privilege</TableCellHeader>
            <TableCellHeader>Admin&nbsp;Option</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedRole === "All" ? true : row.role === selectedRole))
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + currentPage * pageSize + 1}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.privilege}</TableCell>
                <TableCell>{row.adminOption}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RolePrivileges;
