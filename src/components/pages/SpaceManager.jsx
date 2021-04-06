import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

function createData(tablespace, path, status, totalSize, freeSize, occupancy) {
  return { tablespace, path, status, totalSize, freeSize, occupancy };
}

const rows = [
  createData(
    "WMS_LARG",
    "C:/ORACLE/ORADAT/ORCL/WMS.01.DBF",
    "ONLINE",
    "4,000",
    "1,342",
    "45.65%"
  ),
  createData(
    "WMS_LARGE",
    "C:/ORACLE/ORADAT/ORCL/WMS_LARGE.01.DBF",
    "ONLINE",
    "4,000",
    "1,342",
    "45.65%"
  ),
];

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
    dispatch(sidenavSelected({ index: 13 }));
    console.log("123");
  });

  return (
    <div className={classes.root}>
      <Button>Search</Button>
      <Button>Search</Button>
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
              <TableCellHeader>Total&nbsp;Size</TableCellHeader>
              <TableCellHeader>Free&nbsp;Size</TableCellHeader>
              <TableCellHeader>Occupancy</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.tablespace}>
                <TableCell>{row.tablespace}</TableCell>
                <TableCell>{row.path}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">{row.totalSize}</TableCell>
                <TableCell align="right">{row.freeSize}</TableCell>
                <TableCell align="right">{row.occupancy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SpaceManager;
