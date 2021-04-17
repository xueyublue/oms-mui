import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
export const TableLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    width: 100,
    backgroundColor: theme.palette.light.grey,
  },
  bar: {
    borderRadius: 2,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);
