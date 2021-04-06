import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      light: blueGrey[600],
    },
    secondary: {
      main: blueGrey[600],
    },
  },
  typography: {
    fontSize: 12,
  },
});

export default theme;
