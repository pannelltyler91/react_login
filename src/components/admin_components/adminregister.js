import {Component } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import "../add.css"

class Adminregister extends Component {
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
    };
    fetch("http://localhost:3001/api/admin/register", {
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
      <div className="addBox">
        <Card className="addCard">
          <h2>Add Admin </h2>
          <Form onSubmit={this._handleclick}>
            <h4>Email:</h4>
            <Form.Control type="email" name="user_email" id="user_email"></Form.Control>
            <h4>Password:</h4>
            <input type="password" name="user_password" id="user_password"></input>
            <br></br>
            <br></br>
            <Button className="addButton"variant="primary" type="submit">Add</Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Adminregister;
