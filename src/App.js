import AppContainer from "./components/AppContainer";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
