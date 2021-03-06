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

import { TableCellHeader } from "../../components/TableCellHeader";
import { loadOwners, loadTopTables } from "../../store/oracle/space";
import {
  topTablesOwnerChanged,
  topTablesDisplayLimitChanged,
  topTablesPageChanged,
  topTablesPageSizeChanged,
} from "../../store/ui/space";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const displayLimits = [50, 100, 500, 1000];

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const TopTables = () => {
  // call API
  useEffect(() => {
    dispatch(loadOwners());
    dispatch(loadTopTables());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const ownersData = useSelector((state) => state.oracle.space.owners.list);
  const tableData = useSelector((state) => state.oracle.space.topTables.list);
  const selectedOwner = useSelector((state) => state.ui.space.topTables.selectedOwner);
  const selectedDisplayLimit = useSelector((state) => state.ui.space.topTables.selectedDisplayLimit);
  const pageSize = useSelector((state) => state.ui.space.topTables.pageSize);
  const currentPage = useSelector((state) => state.ui.space.topTables.currentPage);

  const handleTopTablesOwnerChange = (event) => {
    dispatch(topTablesOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };
  const handleTopTablesDisplayLimitChange = (event) => {
    dispatch(topTablesDisplayLimitChanged({ selectedDisplayLimit: event.target.value }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };
  const handleTopTablesCurrentPageChange = (event, newPage) => {
    dispatch(topTablesPageChanged({ currentPage: newPage }));
  };
  const handleTopTablesPageSizeChange = (event) => {
    dispatch(topTablesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topTablesPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="top-tables-label-owner">Owner</InputLabel>
        <Select
          labelId="top-tables-label-owner"
          id="top-tables-select-owner"
          value={selectedOwner}
          onChange={handleTopTablesOwnerChange}
        >
          {["All", ...ownersData].map((owner) => (
            <MenuItem dense={true} value={owner} key={owner} key={owner}>
              {owner}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="top-tables-label-display-limit">Display Limit</InputLabel>
        <Select
          labelId="top-tables-label-display-limit"
          id="top-tables-select-display-limit"
          value={selectedDisplayLimit}
          onChange={handleTopTablesDisplayLimitChange}
        >
          {displayLimits.map((displayLimit) => (
            <MenuItem dense={true} value={displayLimit} key={displayLimit}>
              {displayLimit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100, 500]}
        component="div"
        count={
          tableData
            .filter((row) => (selectedOwner === "All" ? true : row.owner === selectedOwner))
            .slice(0, selectedDisplayLimit).length
        }
        rowsPerPage={pageSize}
        page={currentPage}
        onChangePage={handleTopTablesCurrentPageChange}
        onChangeRowsPerPage={handleTopTablesPageSizeChange}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>Owner</TableCellHeader>
            <TableCellHeader>Segment&nbsp;Name</TableCellHeader>
            <TableCellHeader align="right">Segment&nbsp;Size&nbsp;(MB)</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedOwner === "All" ? true : row.owner === selectedOwner))
            .slice(0, selectedDisplayLimit)
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + currentPage * pageSize + 1}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.segmentName}</TableCell>
                <TableCell align="right">{row.segmentSize}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TopTables;
