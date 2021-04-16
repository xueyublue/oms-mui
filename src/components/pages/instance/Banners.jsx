import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Pie } from "react-chartjs-2";

import { loadBanners } from "../../../store/oracle/instance";
import { TableCellHeader } from "../../common/TableCellHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const Banners = () => {
  // call API
  useEffect(() => {
    dispatch(loadBanners());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const bannersData = useSelector((state) => state.oracle.instance.banners.list);

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <TableCellHeader align="center" style={{ width: 60 }}>
            #
          </TableCellHeader>
          <TableCellHeader>Banner</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {bannersData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{row.banner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Banners;
