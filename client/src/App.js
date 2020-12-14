import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const Cotizacion = lazy(() => import("./routes/Cotizacion"));

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<LinearProgress />}>
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/cotizacion" component={Cotizacion} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
