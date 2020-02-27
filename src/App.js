import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Forgotpassword from "./Components/Forgotpassword";
import Resetpassword from "./Components/Resetpassword";
import DashBoard from "./Components/DashBoard";
import CreateNote from "./Components/CreateNote";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" component={Registration}></Route>
          <Route path="/forgot" component={Forgotpassword}></Route>
          <Route path="/reset/:jwt" component={Resetpassword}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/create" component={CreateNote}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
