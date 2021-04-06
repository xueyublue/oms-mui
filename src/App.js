import AppContainer from "./components/AppContainer";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContainer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
