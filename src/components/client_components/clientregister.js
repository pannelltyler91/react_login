import {Component } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Clientregister extends Component {
  constructor() {
    super();
    this.state = {
      registered: false,
    };
  }
  _handleclick = (e) => {
    e.preventDefault();
  
    let data = {
      password: e.target.user_password.value,
      email: e.target.user_email.value,
      first_name:e.target.user_fn.value,
      last_name:e.target.user_ln.value,
      phone:e.target.user_phone.value,
      address:e.target.user_address.value
    };
    
    fetch("http://localhost:3001/api/client/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data.isRegistered);
        if (data.isRegistered) {
          this.setState({ registered: true });
        }
      });
  };

  render() {
    const { registered } = this.state;

    if (registered) {
      return <Redirect to="/client/login" />;
    }
    return (
      <div>
        <div className="title">
          <h2>Client Register</h2>
        </div>
        <Container>
          <Form onSubmit={this._handleclick}>
            <h4>Email:</h4>
            <Form.Control type="email" name="user_email" ></Form.Control>
            <h4>Password:</h4>
            <input type="password" name="user_password"></input>
            <h4>First Name:</h4>
            <input type="text" name="user_fn"></input>
            <h4>Last Name:</h4>
            <input type="text" name="user_ln"></input>
            <h4>Phone:</h4>
            <input type="text" name="user_phone"></input>
            <h4>Address:</h4>
            <input type="text" name="user_address"></input>
            <br></br>
            <br></br>
            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Clientregister;