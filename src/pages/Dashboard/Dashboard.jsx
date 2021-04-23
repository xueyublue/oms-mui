import { Grid } from "@material-ui/core";
import React from "react";
import InstanceDetails from "./../Instance/InstanceDetails";
import Tablespace from "./../Space/Tablespace";
import SgaConfigurationChart from "./../Instance/SgaConfigurationChart";

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <InstanceDetails />
        </Grid>
        <Grid item xs={12} md={6}>
          <SgaConfigurationChart />
        </Grid>
        <Grid item xs={12}>
          <Tablespace />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
