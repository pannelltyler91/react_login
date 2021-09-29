import { React, Component } from "react";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Userprofile from "./components/userProfile";
import Logout from "./components/logout";

class App extends Component {
  render() {
    return (
      <Router>
        <NavLink to="/login">Login</NavLink> |{" "}
        <NavLink to="/register">Register</NavLink>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/userProfile" component={Userprofile}></Route>
          <Route path="/logout" component={Logout}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
