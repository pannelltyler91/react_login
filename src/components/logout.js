import { React, Component } from "react";

class Logout extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out!</h1>
        <a href="/login">Return to Login</a>
      </div>
    );
  }
}

export default Logout;
