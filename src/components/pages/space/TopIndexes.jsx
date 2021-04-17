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
  const topIndexesData = useSelector((state) => state.oracle.space.topIndexes.list);
  const topIndexesSelectedOwner = useSelector((state) => state.ui.space.topIndexes.selectedOwner);
  const topIndexesSelectedDisplayLimit = useSelector((state) => state.ui.space.topIndexes.selectedDisplayLimit);
  const topIndexesPageSize = useSelector((state) => state.ui.space.topIndexes.pageSize);
  const topIndexesCurrentPage = useSelector((state) => state.ui.space.topIndexes.currentPage);

  const handleTopIndexesOwnerChange = (event) => {
    dispatch(topIndexesOwnerChanged({ selectedOwner: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handleTopIndexesDisplayLimitChange = (event) => {
    dispatch(topIndexesDisplayLimitChanged({ selectedDisplayLimit: event.target.value }));
    dispatch(topIndexesPageChanged({ currentPage: 0 }));
  };
  const handleTopIndexesCurrentPageChange = (event, newPage) => {
    dispatch(topIndexesPageChanged({ currentPage: newPage }));
  };
  const handleTopIndexesPageSizeChange = (event) => {
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
          value={topIndexesSelectedOwner}
          onChange={handleTopIndexesOwnerChange}
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
          value={topIndexesSelectedDisplayLimit}
          onChange={handleTopIndexesDisplayLimitChange}
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
          topIndexesData
            .filter((row) => (topIndexesSelectedOwner.length === 0 ? true : row.owner === topIndexesSelectedOwner))
            .slice(0, topIndexesSelectedDisplayLimit).length
        }
        rowsPerPage={topIndexesPageSize}
        page={topIndexesCurrentPage}
        onChangePage={handleTopIndexesCurrentPageChange}
        onChangeRowsPerPage={handleTopIndexesPageSizeChange}
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
          {topIndexesData
            .filter((row) => (topIndexesSelectedOwner.length === 0 ? true : row.owner === topIndexesSelectedOwner))
            .slice(0, topIndexesSelectedDisplayLimit)
            .slice(
              topIndexesCurrentPage * topIndexesPageSize,
              topIndexesCurrentPage * topIndexesPageSize + topIndexesPageSize
            )
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + topIndexesCurrentPage * topIndexesPageSize + 1}</TableCell>
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
