import "./App.scss";
import LandingPage from "./pages/Landing";
import BreedDetailPage from "./pages/BreedDetail";
import BreedFormPage from "./pages/BreedForm";
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
        <Route path="/breed/form">
          <BreedFormPage />
        </Route>
        <Route path="/breed/:id">
          <BreedDetailPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
