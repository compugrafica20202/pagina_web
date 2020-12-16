import {
  createMuiTheme,
  LinearProgress,
  ThemeProvider,
} from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./routes/Home";

const Cotizacion = lazy(() => import("./routes/Cotizacion"));

export const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#5C7339",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#6FAF46",
        contrastText: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<LinearProgress />}>
          <Navbar />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cotizacion" component={Cotizacion} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
