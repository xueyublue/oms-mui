import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Pie } from "react-chartjs-2";

import { loadSgaConfig } from "../../store/oracle/instance";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const SgaConfigurationChart = () => {
  // call API
  useEffect(() => {
    dispatch(loadSgaConfig());
  });

  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.oracle.instance.sgaconfig.list);
  if (!pageData.chart) return <div></div>;

  return (
    <>
      <Pie
        data={{
          labels: pageData.chart.name,
          datasets: [
            {
              data: pageData.chart.data,
              backgroundColor: pageData.chart.backgroundColor,
            },
          ],
        }}
        options={{
          title: { display: true, text: "SGA Configuration (" + pageData.maxSgaSize + " MB In Total)" },
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

export default SgaConfigurationChart;
