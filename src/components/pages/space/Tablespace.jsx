import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box } from "@material-ui/core";

import { TableCellHeader } from "../../common/TableCellHeader";
import { TableLinearProgress } from "./../../common/TableLinearProgress";
import { loadTablespace } from "./../../../store/oracle/space";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Tablespace = () => {
  // call API
  useEffect(() => {
    dispatch(loadTablespace());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.space.tablespace.list);

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCellHeader align="center">#</TableCellHeader>
          <TableCellHeader>Tablespace</TableCellHeader>
          <TableCellHeader>Path</TableCellHeader>
          <TableCellHeader>Status</TableCellHeader>
          <TableCellHeader align="right">Size&nbsp;(MB)</TableCellHeader>
          <TableCellHeader align="right">Free&nbsp;Size&nbsp;(MB)</TableCellHeader>
          <TableCellHeader align="right">Occupancy</TableCellHeader>
          <TableCellHeader>Auto&nbsp;Extend</TableCellHeader>
          <TableCellHeader align="right">Next&nbsp;Extend&nbsp;(MB)</TableCellHeader>
          <TableCellHeader>Contents</TableCellHeader>
          <TableCellHeader>Allocation&nbsp;Type</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={row.name}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.path}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell align="right">{row.size}</TableCell>
            <TableCell align="right">{row.freeSize}</TableCell>
            <TableCell align="right">
              <Box display="flex" alignItems="center">
                <Box>
                  <TableLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={row.occupancy}
                  />
                </Box>
                <Box minWidth={30}>{row.occupancy}%</Box>
              </Box>
            </TableCell>
            <TableCell>{row.autoExtensible}</TableCell>
            <TableCell align="right">{row.nextExtend}</TableCell>
            <TableCell>{row.contents}</TableCell>
            <TableCell>{row.allocationType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tablespace;
