import { React, Component } from "react";

class Adminlogout extends Component {
  render() {
    return (
      <div style={{color:'rgb(26,179,148)'}}>
        <h1>You are logged out!</h1>
        <a href="/admin/login" style={{color:'rgb(26,179,148)'}}>Return to Login</a>
      </div>
    );
  }
}

export default Adminlogout;
