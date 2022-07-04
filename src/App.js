import "./App.scss";
import LandingPage from "./pages/Landing";
import BreedDetailPage from "./pages/BreedDetail";
import BreedFormPage from "./pages/BreedForm";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="content">
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
        </div>
      </Router>
    </div>
  );
}

export default App;
