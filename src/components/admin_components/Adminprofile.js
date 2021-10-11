import { Component } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

class Adminprofile extends Component {
  _handleLogout = (e) => {
    this.setState({ loggedIn: false });
  };
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      date:new Date(),
      dateSelected:false
    };
  }

  _handleCalendarChange = (date) =>{
    console.log(date);
    this.setState({
      dateSelected:true,
      date:date.toString()
    })
    
    
    
  }

  render() {
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return <Redirect to="/admin/logout" />;
    }
    if(this.state.dateSelected){
      return(
        
          <Redirect to={{
            pathname:'/calendarmanager',
            state:{date:this.state.date}
            
          }} />
      )
    }
   
    return (
      <div style={{backgroundColor:'#284b63', display:'flex-box', color:'white'}}>
        <h1>Admin Profile</h1>
        <div>
        <Navbar style={{width:'800px',marginBottom:'20px',backgroundColor:'#778da9',color:'#469D89'}}>
    <Container >
    <Nav className="me-auto">
    <Navbar.Brand href="#home">Views</Navbar.Brand>
      <Nav.Link href="/admin/list">See All Admins</Nav.Link>
      <Nav.Link href="/employee/list">See All Employees</Nav.Link>
      <Nav.Link href="/client/list">See All Clients</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        </div>
        <Card style={{width:'800px',margin:'5px',backgroundColor:'#469D89', border:'solid 6px #469D89',color:'#469D89'}}>
          <Calendar style={{backgroundColor:'#99E2B4'}} onChange={this._handleCalendarChange} />
        </Card>
        <div>
          
          <Navbar  style={{width:'800px',marginTop:'20px', backgroundColor:'#778da9',color:'#469D89'}}>
    <Container >
    <Nav className="me-auto">
    <Navbar.Brand href="#home">Add</Navbar.Brand>
      <Nav.Link href="/admin/register">Add Admin</Nav.Link>
      <Nav.Link href="/employee/register">Add Employee</Nav.Link>
      <Nav.Link href="/client/add">Add Client</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        </div>
        <div style={{margin:'5px'}}>
          <Button style={{backgroundColor:'#778da9'}} onClick={this._handleLogout}>Log Out</Button>
        </div>
      </div>
    );
  }
}

export default Adminprofile;
