import { Component } from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/navbar';
import Container from 'react-bootstrap/container';
import Nav from 'react-bootstrap/nav';

class Header extends Component {
  render() {
    return (
      
  <Navbar style={{backgroundColor:'#212F45',marginBottom:'30px'}}>
    <Container fluid>
    <Navbar.Brand style={{color:'#006466'}} href="#home"><b>Catalyst(SBM)</b></Navbar.Brand>
    <Nav style={{color:'#006466'}}className="me-auto">
      <Nav.Link style={{color:'#006466'}} href="/"><b>Home</b></Nav.Link>
      <Nav.Link style={{color:'#006466'}} href="/admin/login"><b>Admin</b></Nav.Link>
      <Nav.Link style={{color:'#006466'}} href="/employee/login"><b>Employee</b></Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      
    );
  }
}

export default Header;
