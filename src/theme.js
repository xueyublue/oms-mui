import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      light: blueGrey[600],
    },
    secondary: {
      main: blueGrey[600],
      contrastText: blueGrey[50]
    },
    danger: {
      main: purple[900],
      contrastText: purple[50]
    },
  },
  typography: {
    fontSize: 12,
  },
  shape: {
    borderRadius: 5
  },
  spacing: 4,
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: "none",
      padding: 4
    }
  }
}

theme.props = {
  MuiButton: {
    variant: "contained",
    color: "secondary"
  }
}

export default theme;
