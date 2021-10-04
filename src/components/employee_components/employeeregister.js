import {Component } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Employeeregister extends Component {
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
      name:e.target.user_name.value,
      phone:e.target.user_phone.value,
      address:e.target.user_address.value,
      employeeid:e.target.user_id.value,
      salary:e.target.user_salary.value
    };
    fetch("http://localhost:3001/api/employee/register", {
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
      return <Redirect to="/admin/profile" />;
    }
    return (
      <div>
        <div className="title">
          <h2>Employee Register</h2>
        </div>
        <Container>
          <Form onSubmit={this._handleclick}>
            <h4>Email:</h4>
            <Form.Control type="email" name="user_email" ></Form.Control>
            <h4>Password:</h4>
            <input type="password" name="user_password"></input>
            <h4>Name:</h4>
            <input type="text" name="user_name"></input>
            <h4>Address:</h4>
            <input type="text" name="user_address"></input>
            <h4>Phone:</h4>
            <input type="text" name="user_phone"></input>
            <h4>Employee Id:</h4>
            <input type="text" name="user_id"></input>
            <h4>Salary:</h4>
            <input type="number" name="user_salary"></input>
            <br></br>
            <br></br>
            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Employeeregister;