import {Component } from "react";

class Employeelogout extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out!</h1>
        <a href="/employee/login">Return to Login</a>
      </div>
    );
  }
}

export default Employeelogout;
