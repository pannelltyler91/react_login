import { React, Component } from "react";

class Adminlogout extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out!</h1>
        <a href="/adminlogin">Return to Login</a>
      </div>
    );
  }
}

export default Adminlogout;
