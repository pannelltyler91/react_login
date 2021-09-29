import { Component } from "react";
import { Redirect } from "react-router-dom";

class Userprofile extends Component {
  construtor() {
    super();
    this.state = {
      loggedIn: true,
    };
  }
  _handleLogout = (e) => {
    console.log(this.state.loggedIn);
    this.setState({ loggedIn: false });
    console.log(this.state.loggedIn);
  };
  render() {
    // const { loggedIn } = this.state;

    if (!this.state.loggedIn) {
      return <Redirect to="/logout" />;
    }
    return (
      <div>
        <h1>User Profile</h1>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Userprofile;
