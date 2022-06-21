import "./App.scss";
import LandingPage from "./pages/Landing";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        {/* <Route path="/breed/:id">
          <LandingPage />
        </Route>
        <Route path="/breed/form">
          <LandingPage />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
