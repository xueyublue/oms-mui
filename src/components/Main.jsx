import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <div>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>1</Typography>
        <Typography paragraph>1</Typography>
      </main>
    </div>
  );
};

export default Main;
