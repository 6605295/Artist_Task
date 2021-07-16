import React from "react";
import Home from "./components/Artists/Home";
import Details from "./components/Events/Details";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:name" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}
