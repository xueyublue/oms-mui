import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { loadDetails } from "./../../../store/oracle/instance";
import { TableCellHeader } from "../../common/TableCellHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const InstanceDetails = () => {
  useEffect(() => {
    dispatch(loadDetails());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const detailsData = useSelector((state) => state.oracle.instance.details.list);

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCellHeader>Field</TableCellHeader>
          <TableCellHeader>Value</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {detailsData.map((row) => (
          <TableRow key={row.key}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InstanceDetails;
