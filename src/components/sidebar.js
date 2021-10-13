import { Component } from "react";
import {NavLink} from 'react-router-dom';
import '../App.css'
import Card from 'react-bootstrap/Card';

class Sidebar extends Component {
  render() {
    return (
      <Card id='sidebar' style={{height:'85vh',width:'150px', backgroundColor:'rgb(38,57,73)',color:'#006466',border:'2px solid #006466',marginBottom:'35px'}}>
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
      </Card>
    );
  }
}

export default Sidebar;
