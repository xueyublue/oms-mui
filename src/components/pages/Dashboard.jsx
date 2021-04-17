import { Grid } from "@material-ui/core";
import React from "react";
import InstanceDetails from "./instance/InstanceDetails";
import SgaConfiguration from "./instance/SgaConfiguration";
import Tablespace from "./space/Tablespace";
import SgaConfigurationChart from "./instance/SgaConfigurationChart";

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
