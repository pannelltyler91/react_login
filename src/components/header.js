import { Component } from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/navbar';
import Container from 'react-bootstrap/container';
import Nav from 'react-bootstrap/nav';

class Header extends Component {
  render() {
    return (
      
  <Navbar>
    <Container fluid>
    <Navbar.Brand href="#home">Catalyst(SBM)</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin/login">Admin</Nav.Link>
      <Nav.Link href="/employee/login">Employee</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      
    );
  }
}

export default Header;
