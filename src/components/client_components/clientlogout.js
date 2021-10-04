import {Component } from "react";

class Clientlogout extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out!</h1>
        <a href="/client/login">Return to Login</a>
      </div>
    );
  }
}

export default Clientlogout;
