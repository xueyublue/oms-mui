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

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadOwners, loadTopIndexes } from "../../../store/oracle/space";
import {
  topIndexesOwnerChanged,
  topIndexesDisplayLimitChanged,
  topIndexesPageChanged,
  topIndexesPageSizeChanged,
} from "../../../store/ui/space";
import { TablePagination } from "@material-ui/core";

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
const TopIndexes = () => {
  // call API
  useEffect(() => {
    dispatch(loadOwners());
    dispatch(loadTopIndexes());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const ownersData = useSelector((state) => state.oracle.space.owners.list);
  const tableData = useSelector((state) => state.oracle.space.topIndexes.list);
  const selectedOwner = useSelector((state) => state.ui.space.topIndexes.selectedOwner);
  const selectedDisplayLimit = useSelector((state) => state.ui.space.topIndexes.selectedDisplayLimit);
  const pageSize = useSelector((state) => state.ui.space.topIndexes.pageSize);
  const currentPage = useSelector((state) => state.ui.space.topIndexes.currentPage);

  const handleOwnerChange = (event) => {
    dispatch(topIndexesOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handleDisplayLimitChange = (event) => {
    dispatch(topIndexesDisplayLimitChanged({ selectedDisplayLimit: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handlePageChange = (event, newPage) => {
    dispatch(topIndexesPageChanged({ currentPage: newPage }));
  };
  const handlePageSizeChange = (event) => {
    dispatch(topIndexesPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="top-indexes-label-owner">Owner</InputLabel>
        <Select
          labelId="top-indexes-label-owner"
          id="top-indexes-select-owner"
          value={selectedOwner}
          onChange={handleOwnerChange}
        >
          {ownersData.map((owner) => (
            <MenuItem dense={true} value={owner} key={owner}>
              {owner}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="top-indexes-label-display-limit">Display Limit</InputLabel>
        <Select
          labelId="top-indexes-label-display-limit"
          id="top-indexes-select-display-limit"
          value={selectedDisplayLimit}
          onChange={handleDisplayLimitChange}
        >
          {displayLimits.map((displayLimit) => (
            <MenuItem dense={true} value={displayLimit}>
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
            .filter((row) => (selectedOwner.length === 0 ? true : row.owner === selectedOwner))
            .slice(0, selectedDisplayLimit).length
        }
        rowsPerPage={pageSize}
        page={currentPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePageSizeChange}
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
            .filter((row) => (selectedOwner.length === 0 ? true : row.owner === selectedOwner))
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

export default TopIndexes;
