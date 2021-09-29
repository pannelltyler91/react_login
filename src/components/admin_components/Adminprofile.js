import { Component } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";


class Adminprofile extends Component {
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
      return <Redirect to="/admin/logout" />;
    }
    return (
      <div>
        <h1>Admin Profile</h1>
        <div>
        <h3>Views</h3>
        <NavLink to="/client/list"> See All Clients</NavLink> |{" "}
        <NavLink to="/employee/list"> See All Employees</NavLink> |{" "}
        <NavLink to="/admin/list"> See All Admins</NavLink> |{" "}
        </div>
        <div>
          <h3>Add</h3>
        <NavLink to="/client/register"> Add Client</NavLink> |{" "}
        <NavLink to="/employee/register"> Add Employee</NavLink> |{" "}
        <NavLink to="/admin/register"> Add Admin</NavLink> |{" "}
        </div>
        <div>
          <button onClick={this._handleLogout}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default Adminprofile;
