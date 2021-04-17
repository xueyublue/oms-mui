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
import { loadOwners, loadTableRecords } from "../../../store/oracle/space";
import {
  tableRecordsOwnerChanged,
  tableRecordsPageChanged,
  tableRecordsPageSizeChanged,
} from "../../../store/ui/space";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const owners = ["MC", "WMS", "WMS_TOOL"];

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const TableRecords = () => {
  // call API
  useEffect(() => {
    dispatch(loadOwners());
    dispatch(loadTableRecords());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableRecordsData = useSelector((state) => state.oracle.space.tableRecords.list);
  const tableRecordsSelectedOwner = useSelector((state) => state.ui.space.tableRecords.selectedOwner);
  const tableRecordsPageSize = useSelector((state) => state.ui.space.tableRecords.pageSize);
  const tableRecordsCurrentPage = useSelector((state) => state.ui.space.tableRecords.currentPage);

  const handleTableRecordsOwnerChange = (event) => {
    dispatch(tableRecordsOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(tableRecordsPageChanged({ currentPage: 0 }));
  };
  const handleTableRecordsCurrentPageChange = (event, newPage) => {
    dispatch(tableRecordsPageChanged({ currentPage: newPage }));
  };
  const handleTableRecordsPageSizeChange = (event) => {
    dispatch(tableRecordsPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(tableRecordsPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="table-records-label-owner">Owner</InputLabel>
        <Select
          labelId="table-records-label-owner"
          id="table-records-select-owner"
          value={tableRecordsSelectedOwner}
          onChange={handleTableRecordsOwnerChange}
        >
          {owners.map((owner) => (
            <MenuItem dense={true} value={owner}>
              {owner}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100]}
        component="div"
        count={
          tableRecordsData.filter((row) =>
            tableRecordsSelectedOwner.length === 0 ? true : row.owner === tableRecordsSelectedOwner
          ).length
        }
        rowsPerPage={tableRecordsPageSize}
        page={tableRecordsCurrentPage}
        onChangePage={handleTableRecordsCurrentPageChange}
        onChangeRowsPerPage={handleTableRecordsPageSizeChange}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>Owner</TableCellHeader>
            <TableCellHeader>Table&nbsp;Name</TableCellHeader>
            <TableCellHeader align="right">Total&nbsp;Records</TableCellHeader>
            <TableCellHeader>Tablespace</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRecordsData
            .filter((row) => (tableRecordsSelectedOwner.length === 0 ? true : row.owner === tableRecordsSelectedOwner))
            .slice(
              tableRecordsCurrentPage * tableRecordsPageSize,
              tableRecordsCurrentPage * tableRecordsPageSize + tableRecordsPageSize
            )
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + tableRecordsCurrentPage * tableRecordsPageSize + 1}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.tableName}</TableCell>
                <TableCell align="right">{row.totalRecords}</TableCell>
                <TableCell>{row.tablespace}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableRecords;
