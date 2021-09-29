import { React, Component } from "react";
import "./App.css";
import Adminregister from "./components/admin_components/adminregister";
import Adminlogin from "./components/admin_components/adminlogin";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Adminprofile from "./components/admin_components/Adminprofile";
import Adminlogout from "./components/admin_components/adminlogout";
import Employeelogin from "./components/employee_components/employeelogin";
import Employeelogout from "./components/employee_components/employeelogout";
import Employeeregister from "./components/employee_components/employeeregister";
import Employeeprofile from "./components/employee_components/employeeprofile";
import Clientlogin from "./components/client_components/clientlogin";
import Clientlogout from "./components/client_components/clientlogout";
import Clientprofile from "./components/client_components/clientprofile";
import Clientregister from "./components/client_components/clientregister";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="navbar">
        <NavLink to="/adminlogin">Admin Login</NavLink> |{" "}
        <NavLink to="/employeelogin"> Employee Login</NavLink> |{" "}
        <NavLink to="/client/login"> Client Login</NavLink> |{" "}
        <NavLink to="/client/register"> Client Register</NavLink> |{" "}
        </div>
        <Switch>
          <Route path="/adminlogin" component={Adminlogin}></Route>
          <Route path="/adminregister" component={Adminregister}></Route>
          <Route path="/adminprofile" component={Adminprofile}></Route>
          <Route path="/adminlogout" component={Adminlogout}></Route>
          <Route path="/employeelogin" component={Employeelogin}></Route>
          <Route path="/employeeregister" component={Employeeregister}></Route>
          <Route path="/employeeprofile" component={Employeeprofile}></Route>
          <Route path="/employeelogout" component={Employeelogout}></Route>
          <Route path="/client/login" component={Clientlogin}></Route>
          <Route path="/client/register" component={Clientregister}></Route>
          <Route path="/client/profile" component={Clientprofile}></Route>
          <Route path="/client/logout" component={Clientlogout}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
