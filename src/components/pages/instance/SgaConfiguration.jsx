import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Pie } from "react-chartjs-2";

import { TableCellHeader } from "../../common/TableCellHeader";
import { loadSgaConfig } from "../../../store/oracle/instance";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const SgaConfiguration = () => {
  // call API
  useEffect(() => {
    dispatch(loadSgaConfig());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const sgaconfigData = useSelector((state) => state.oracle.instance.sgaconfig.list);
  if (!sgaconfigData.chart) return <div></div>;

  return (
    <>
      <Table className={classes.table} size="small">
        <caption>
          <h4>SGA memory {sgaconfigData.maxSgaSize} MB in total.</h4>
        </caption>
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>Name</TableCellHeader>
            <TableCellHeader align="right">Size</TableCellHeader>
            <TableCellHeader align="right">Percentage</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sgaconfigData.table.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pie
        data={{
          labels: sgaconfigData.chart.name,
          datasets: [
            {
              data: sgaconfigData.chart.data,
              backgroundColor: sgaconfigData.chart.backgroundColor,
            },
          ],
        }}
        options={{
          title: { display: false, text: "SGA Configuration (" + sgaconfigData.maxSgaSize + "MB In Total)" },
          maintainAspectRatio: true,
          scales: {
            yAxes: [{ ticks: { display: false }, gridLines: { display: false } }],
          },
          legend: { position: "right" },
        }}
        height={1}
        width={3}
      />
    </>
  );
};

export default SgaConfiguration;