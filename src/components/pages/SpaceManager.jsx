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
import { Box, Button, lighten, LinearProgress } from "@material-ui/core";
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

const TableCellHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    width: 100,
    backgroundColor: theme.palette.secondary.contrastText,
  },
  bar: {
    borderRadius: 1,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

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
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Tablespace</TableCellHeader>
              <TableCellHeader>Path</TableCellHeader>
              <TableCellHeader>Status</TableCellHeader>
              <TableCellHeader align="right">Size&nbsp;(MB)</TableCellHeader>
              <TableCellHeader align="right">Free&nbsp;Size&nbsp;(MB)</TableCellHeader>
              <TableCellHeader align="right">Occupancy</TableCellHeader>
              <TableCellHeader align="right">Next&nbsp;Extend&nbsp;(MB)</TableCellHeader>
              <TableCellHeader>Contents</TableCellHeader>
              <TableCellHeader>Allocation&nbsp;Type</TableCellHeader>
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
                <TableCell align="right">
                  <Box display="flex" alignItems="center">
                    <Box>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={row.occupancy}
                      />
                    </Box>
                    <Box minWidth={30}>{row.occupancy}%</Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.nextExtend}</TableCell>
                <TableCell>{row.contents}</TableCell>
                <TableCell>{row.allocationType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SpaceManager;
