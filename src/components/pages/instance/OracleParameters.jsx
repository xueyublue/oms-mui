import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";

import { loadParameters } from "../../../store/oracle/instance";
import { TableCellHeader } from "../../common/TableCellHeader";
import { parameterPageChanged, parameterPageSizeChanged } from "../../../store/ui/instance";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const OracleParameters = () => {
  // call API
  useEffect(() => {
    dispatch(loadParameters());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.instance.parameters.list);
  const pageSize = useSelector((state) => state.ui.instance.parameters.pageSize);
  const currentPage = useSelector((state) => state.ui.instance.parameters.currentPage);

  const handlePageChange = (event, newPage) => {
    dispatch(parameterPageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(parameterPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(parameterPageChanged({ currentPage: 0 }));
  };

  return (
    <>
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
            <TableCellHeader>Name</TableCellHeader>
            <TableCellHeader>Type</TableCellHeader>
            <TableCellHeader>Value</TableCellHeader>
            <TableCellHeader>Description</TableCellHeader>
            <TableCellHeader>Is&nbsp;Default</TableCellHeader>
            <TableCellHeader>Is&nbsp;SessionI&nbsp;Modifiable</TableCellHeader>
            <TableCellHeader>Is&nbsp;SystemI&nbsp;Modifiable</TableCellHeader>
            <TableCellHeader>Is&nbsp;InstanceI&nbsp;Modifiable</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((row, index) => (
            <TableRow key={row.name}>
              <TableCell align="center">{index + currentPage * pageSize + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.isDefault}</TableCell>
              <TableCell>{row.isSessionModifiable}</TableCell>
              <TableCell>{row.isSystemModifiable}</TableCell>
              <TableCell>{row.isInstanceModifiable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OracleParameters;
