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
import { parameterPageChanged, parameterPageSizeChanged } from "../../../store/ui/instanceDetail";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const OracleParameters = () => {
  useEffect(() => {
    dispatch(loadParameters());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const parametersData = useSelector((state) => state.oracle.instance.parameters.list);
  const parametersPageSize = useSelector((state) => state.ui.instanceDetail.parameters.pageSize);
  const parametersCurrentPage = useSelector((state) => state.ui.instanceDetail.parameters.currentPage);

  const handleParametersCurrentPageChange = (event, newPage) => {
    dispatch(parameterPageChanged({ currentPage: newPage }));
  };
  const handleParametersPageSizeChange = (event) => {
    dispatch(parameterPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(parameterPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100, 500]}
        component="div"
        count={parametersData.length}
        rowsPerPage={parametersPageSize}
        page={parametersCurrentPage}
        onChangePage={handleParametersCurrentPageChange}
        onChangeRowsPerPage={handleParametersPageSizeChange}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
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
          {parametersData
            .slice(
              parametersCurrentPage * parametersPageSize,
              parametersCurrentPage * parametersPageSize + parametersPageSize
            )
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell align="center">{index + parametersCurrentPage * parametersPageSize + 1}</TableCell>
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
