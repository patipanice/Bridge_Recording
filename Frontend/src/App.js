import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./component/Home";
import Playing from "./component/Playing/Playing";
import Recording from "./component/Recording/Recording";
import AboutMe from "./component/AboutMe";
import Navbar from "./component/Navbar";
import History from "./component/History/History";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/aboutme">
            <AboutMe />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/playing">
            <Playing />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
