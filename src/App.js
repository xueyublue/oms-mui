import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./components/Appbar";
import Sidenav from "./components/Sidenav";
import MainContainer from "./components/MainContainer";

const store = configureStore();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <Appbar />
            <Sidenav />
            <MainContainer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
