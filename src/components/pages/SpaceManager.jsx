import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidenavSelected } from "../../store/ui/sidenav";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { loadTablespace } from "./../../store/entities/tablespace";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
}));

// function createData(tablespace, path, status, totalSize, freeSize, occupancy) {
//   return { tablespace, path, status, totalSize, freeSize, occupancy };
// }

// const rows = [
//   createData(
//     "WMS_LARG",
//     "C:/ORACLE/ORADAT/ORCL/WMS.01.DBF",
//     "ONLINE",
//     "4,000",
//     "1,342",
//     "45.65%"
//   ),
//   createData(
//     "WMS_LARGE",
//     "C:/ORACLE/ORADAT/ORCL/WMS_LARGE.01.DBF",
//     "ONLINE",
//     "4,000",
//     "1,342",
//     "45.65%"
//   ),
// ];

const TableCellHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

const SpaceManager = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 13 }));
    dispatch(loadTablespace());
  });

  const rows = useSelector((state) => state.entities.tablespace.list);
  console.log(rows);

  return (
    <div className={classes.root}>
      <Button startIcon={<RefreshIcon />}>Refresh</Button>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCellHeader>Tablespace</TableCellHeader>
              <TableCellHeader>Path</TableCellHeader>
              <TableCellHeader>Status</TableCellHeader>
              <TableCellHeader align="right">Size&nbsp;(MB)</TableCellHeader>
              <TableCellHeader align="right">
                Free&nbsp;Size&nbsp;(MB)
              </TableCellHeader>
              <TableCellHeader align="right">Occupancy</TableCellHeader>
              <TableCellHeader align="right">
                Next&nbsp;Extend&nbsp;(MB)
              </TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.path}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.freeSize}</TableCell>
                <TableCell align="right">{row.occupancy}%</TableCell>
                <TableCell align="right">{row.nextExtend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SpaceManager;
