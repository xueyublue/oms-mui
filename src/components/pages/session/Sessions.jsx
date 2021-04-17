import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, TablePagination, Box } from "@material-ui/core";

import { TableCellHeader } from "../../common/TableCellHeader";
import { pageChanged, pageSizeChanged } from "../../../store/ui/session";
import { loadSessions } from "../../../store/oracle/session";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

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
  const pageSize = useSelector((state) => state.ui.session.pageSize);
  const currentPage = useSelector((state) => state.ui.session.currentPage);

  const handlePageChange = (event, newPage) => {
    dispatch(pageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(pageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(pageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <Button>Show All Columns</Button>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100, 500]}
        component="div"
        count={tableData.length}
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
            <TableCellHeader>Action</TableCellHeader>
            <TableCellHeader>Module</TableCellHeader>
            <TableCellHeader>Logon&nbsp;Time</TableCellHeader>
            <TableCellHeader>Server</TableCellHeader>
            <TableCellHeader>Type</TableCellHeader>
            <TableCellHeader>SQL&nbsp;Address</TableCellHeader>
            <TableCellHeader>Previous&nbsp;SQL&nbsp;Address</TableCellHeader>
            <TableCellHeader>SQL&nbsp;ID</TableCellHeader>
            <TableCellHeader>Previous&nbsp;SQL&nbsp;ID</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((row, index) => (
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
              <TableCell>{row.action}</TableCell>
              <TableCell>{row.module}</TableCell>
              <TableCell>{row.logonTime}</TableCell>
              <TableCell>{row.server}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.sqlAddress}</TableCell>
              <TableCell>{row.previousSqlAddress}</TableCell>
              <TableCell>{row.sqlId}</TableCell>
              <TableCell>{row.previousSqlId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Sessions;
