import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/register" component={Registration}></Route>
        </Router>

        <Registration />
      </div>
    );
  }
}

export default App;
