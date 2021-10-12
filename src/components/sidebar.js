import { Component } from "react";
import {NavLink} from 'react-router-dom';
import '../App.css'

class Sidebar extends Component {
  render() {
    return (
      <div id='sidebar' style={{height:'94vh',width:'250px', backgroundColor:'rgb(26,179,148)'}}>
        <h3>Catalyst</h3>
        <div className='sidebarItem'>
        <NavLink to="/admin/list">See All Admins</NavLink>
        </div>
        <div className='sidebarItem'>
        <NavLink to="/employee/list">See All Employees</NavLink>
        </div>
        <div className='sidebarItem'>
        <NavLink to="/client/list">See All Clients</NavLink>
        </div>
        <div className='sidebarItem'>
        <NavLink to="/admin/register">Add Admin</NavLink>
        </div>
        <div className='sidebarItem'>
        <NavLink to="/employee/register">Add Employee</NavLink>
        </div>
        <div className='sidebarItem'>
        <NavLink to="/client/add">Add Client</NavLink>
        </div>
      </div>
    );
  }
}

export default Sidebar;
