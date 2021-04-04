import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: blueGrey[600],
    },
  },
  typography: {
    fontSize: 13,
  },
});

export default theme;
