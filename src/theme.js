import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
      light: blueGrey[700],
    },
    secondary: {
      main: blueGrey[700],
      light: blueGrey[500],
      contrastText: blueGrey[10],
    },
    light: {
      grey: blueGrey[100],
    },
  },
  typography: {
    fontSize: 12,
  },
  shape: {
    borderRadius: 5,
  },
  spacing: 2,
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: "none",
    },
  },
  MuiTabs: {
    root: {
      minHeight: 36,
    },
  },
  MuiTab: {
    root: {
      textTransform: "none",
      minHeight: 36,
    },
  },
  MuiTablePagination: {
    root: {
      display: "flex",
      justifyContent: "left",
      width: "100%",
      alignItems: "center",
      padding: "0px",
      height: 48,
    },
    toolbar: {
      minHeight: 32,
    },
  },
};

theme.props = {
  MuiButton: {
    variant: "contained",
    color: "secondary",
    size: "small",
  },
};

export default theme;
