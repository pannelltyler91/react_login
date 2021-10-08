import { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className='navbar' style={{backgroundColor:'forestgreen',display:'inline-flex'}}>
          
        <div className="links">
          <NavLink to="/">Grass4Less</NavLink> |{" "}
          <NavLink to="/aboutus">About Us</NavLink> |{" "}
          <NavLink to="/contactus">Contact Us</NavLink> |{" "}
          <NavLink to="/admin/login">Admin</NavLink> |{" "}
          <NavLink to="/employee/login"> Employee</NavLink> |{" "}
          <NavLink to="/client/login"> Client</NavLink> |{" "}
        </div>
      </div>
    );
  }
}

export default Header;
