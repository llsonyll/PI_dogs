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
            <Route exact path="/PI_dogs">
              <LandingPage />
            </Route>
            <Route path="/PI_dogs/home">
              <Home />
            </Route>
            <Route path="/PI_dogs/breed/form">
              <BreedFormPage />
            </Route>
            <Route path="/PI_dogs/breed/:id">
              <BreedDetailPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
