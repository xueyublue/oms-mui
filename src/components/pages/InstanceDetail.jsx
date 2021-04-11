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
import { Box, Button, LinearProgress } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { loadTablespace } from "./../../store/entities/tablespace";
import { loadBanners, loadDetails, loadResourceLimit } from "./../../store/entities/instance";

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
    backgroundColor: theme.palette.light.grey,
  },
  bar: {
    borderRadius: 1,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

const InstanceDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 11 }));
    dispatch(loadDetails());
    dispatch(loadBanners());
    dispatch(loadResourceLimit());
  });

  const detailsData = useSelector((state) => state.entities.instance.details.list);
  const bannersData = useSelector((state) => state.entities.instance.banners.list);
  const resourceLimitData = useSelector((state) => state.entities.instance.resourceLimit.list);

  return (
    <div className={classes.root}>
      <Button startIcon={<RefreshIcon />}>Refresh</Button>
      <TableContainer component={Paper}>
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
      </TableContainer>
      <TableContainer component={Paper}>
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
      </TableContainer>
      <TableContainer component={Paper}>
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
      </TableContainer>
    </div>
  );
};

export default InstanceDetail;
