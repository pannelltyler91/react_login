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
import Adminlist from "./components/admin_components/adminlist";
import Employeelogin from "./components/employee_components/employeelogin";
import Employeelogout from "./components/employee_components/employeelogout";
import Employeeregister from "./components/employee_components/employeeregister";
import Employeeprofile from "./components/employee_components/employeeprofile";
import Employeelist from "./components/employee_components/employeelist";
import Clientlogin from "./components/client_components/clientlogin";
import Clientlogout from "./components/client_components/clientlogout";
import Clientprofile from "./components/client_components/clientprofile";
import Clientregister from "./components/client_components/clientregister";
import Clientlist from "./components/client_components/clientlist";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="navbar">
        <NavLink to="/admin/login">Admin Login</NavLink> |{" "}
        <NavLink to="/employee/login"> Employee Login</NavLink> |{" "}
        <NavLink to="/client/login"> Client Login</NavLink> |{" "}
        <NavLink to="/client/register"> Client Register</NavLink> |{" "}

        <NavLink to="/employee/register"> Employee Register</NavLink> |{" "}
        </div>
        <Switch>
          <Route path="/admin/login" component={Adminlogin}></Route>
          <Route path="/admin/register" component={Adminregister}></Route>
          <Route path="/admin/profile" component={Adminprofile}></Route>
          <Route path="/admin/logout" component={Adminlogout}></Route>
          <Route path="/admin/list" component={Adminlist}></Route>
          <Route path="/employee/login" component={Employeelogin}></Route>
          <Route path="/employee/register" component={Employeeregister}></Route>
          <Route path="/employee/profile" component={Employeeprofile}></Route>
          <Route path="/employee/logout" component={Employeelogout}></Route>
          <Route path="/employee/list" component={Employeelist}></Route>
          <Route path="/client/login" component={Clientlogin}></Route>
          <Route path="/client/register" component={Clientregister}></Route>
          <Route path="/client/profile" component={Clientprofile}></Route>
          <Route path="/client/logout" component={Clientlogout}></Route>
          <Route path="/client/list" component={Clientlist}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
