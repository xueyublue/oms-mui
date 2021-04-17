import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
export const TableCellHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);
