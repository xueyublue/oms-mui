import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";

import { loadResourceLimit } from "../../../store/oracle/instance";
import { TableCellHeader } from "../../common/TableCellHeader";
import { resourceLimitPageChanged, resourceLimitPageSizeChanged } from "../../../store/ui/instance";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const ResourceLimit = () => {
  // call API
  useEffect(() => {
    dispatch(loadResourceLimit());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const resourceLimitData = useSelector((state) => state.oracle.instance.resourceLimit.list);
  const resourceLimitPageSize = useSelector((state) => state.ui.instance.resourceLimit.pageSize);
  const resourceLimitCurrentPage = useSelector((state) => state.ui.instance.resourceLimit.currentPage);

  const handleResourceLimitCurrentPageChange = (event, newPage) => {
    dispatch(resourceLimitPageChanged({ currentPage: newPage }));
  };
  const handleResourceLimitPageSizeChange = (event) => {
    dispatch(resourceLimitPageSizeChanged({ pageSize: parseInt(event.target.value) }));
    dispatch(resourceLimitPageChanged({ currentPage: 0 }));
  };

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30, 100]}
        component="div"
        count={resourceLimitData.length}
        rowsPerPage={resourceLimitPageSize}
        page={resourceLimitCurrentPage}
        onChangePage={handleResourceLimitCurrentPageChange}
        onChangeRowsPerPage={handleResourceLimitPageSizeChange}
      />
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>ResourceI&nbsp;Name</TableCellHeader>
            <TableCellHeader>CurrentI&nbsp;Utilization</TableCellHeader>
            <TableCellHeader>MaxI&nbsp;Utilization</TableCellHeader>
            <TableCellHeader>InitialI&nbsp;Allocation</TableCellHeader>
            <TableCellHeader>LimitI&nbsp;Value</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {resourceLimitData
            .slice(
              resourceLimitCurrentPage * resourceLimitPageSize,
              resourceLimitCurrentPage * resourceLimitPageSize + resourceLimitPageSize
            )
            .map((row, index) => (
              <TableRow key={row.resourceName}>
                <TableCell align="center">{index + resourceLimitCurrentPage * resourceLimitPageSize + 1}</TableCell>
                <TableCell>{row.resourceName}</TableCell>
                <TableCell>{row.currentUtilization}</TableCell>
                <TableCell>{row.maxUtilization}</TableCell>
                <TableCell>{row.initialAllocation}</TableCell>
                <TableCell>{row.limitValue}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ResourceLimit;
