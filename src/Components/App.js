import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const NoMatch = ({ location }) => (
  <div className="container content">
    404- No match for <code>{location.pathname}</code>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <div className="container content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
