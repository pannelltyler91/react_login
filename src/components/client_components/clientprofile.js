import { Component } from "react";
import { Redirect } from "react-router-dom";

class Clientprofile extends Component {
  _handleLogout = (e) => {
    this.setState({ loggedIn: false });
  };
  constructor() {
    super();
    this.state = {
      loggedIn: true,
    };
  }

  render() {
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return <Redirect to="/clientlogout" />;
    }
    return (
      <div>
        <h1>Client Profile</h1>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Clientprofile;
