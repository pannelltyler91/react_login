import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
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
import Clientadd from "./components/client_components/clientadd";
import Aboutus from "./components/aboutus";
import Contact from "./components/contactus";
import Calendarmanager from "./components/admin_components/admincalendarmanager";
import Scheduleadd from "./components/admin_components/adminschedulemanager";
import Scheduleview from "./components/admin_components/adminscheduleview";
import Talendar from "./components/calendar";
import Navbar from "react-bootstrap/navbar";
import Container from "react-bootstrap/container";
import Nav from "react-bootstrap/nav";

class App extends Component {
  render() {
    return (
      <div id="App" style={{ backgroundColor: "#212F45", height: "100vh" }}>
        <Router>
          <Navbar style={{ backgroundColor: "#212F45", marginBottom: "30px" }}>
            <Container fluid>
              <Navbar.Brand style={{ color: "#006466" }} href="#home">
                <b>Catalyst 1.0 (SBM)</b>
              </Navbar.Brand>
              <Nav style={{ color: "#006466" }} className="me-auto">
                <Nav.Link style={{ color: "#006466" }} href="/">
                  <b>Home</b>
                </Nav.Link>
                <Nav.Link style={{ color: "#006466" }} href="/admin/login">
                  <b>Admin</b>
                </Nav.Link>
                <Nav.Link style={{ color: "#006466" }} href="/employee/login">
                  <b>Employee</b>
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div id="textBox">
            <h1>Catalyst 1.0</h1>
          </div>

          <Switch>
            <Route path="/admin/login" component={Adminlogin}></Route>
            <Route path="/admin/register" component={Adminregister}></Route>
            <Route path="/admin/profile" component={Adminprofile}></Route>
            <Route path="/admin/logout" component={Adminlogout}></Route>
            <Route path="/admin/list" component={Adminlist}></Route>
            <Route path="/employee/login" component={Employeelogin}></Route>
            <Route
              path="/employee/register"
              component={Employeeregister}
            ></Route>
            <Route path="/employee/profile" component={Employeeprofile}></Route>
            <Route path="/employee/logout" component={Employeelogout}></Route>
            <Route path="/employee/list" component={Employeelist}></Route>
            <Route path="/client/login" component={Clientlogin}></Route>
            <Route path="/client/register" component={Clientregister}></Route>
            <Route path="/client/profile" component={Clientprofile}></Route>
            <Route path="/client/logout" component={Clientlogout}></Route>
            <Route path="/client/list" component={Clientlist}></Route>
            <Route path="/client/add" component={Clientadd}></Route>
            <Route path="/aboutus" component={Aboutus}></Route>
            <Route path="/contactus" component={Contact}></Route>
            <Route path="/calendarmanager" component={Calendarmanager}></Route>
            <Route path="/schedule/add" component={Scheduleadd}></Route>
            <Route path="/schedule/view" component={Scheduleview}></Route>
            <Route path="/calendar" component={Talendar}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
