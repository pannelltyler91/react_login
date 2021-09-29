import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class Adminlogin extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }
  _handleclick = (e) => {
    e.preventDefault();
    let data = {
      password: e.target.user_password.value,
      email: e.target.user_email.value,
    };
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data.isLoggedIn);
        if (data.isLoggedIn) {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/adminprofile" />;
    }
    return (
      <div>
        <h2>Admin Login</h2>
        <Container>
          <Form onSubmit={this._handleclick}>
            <h4>Email:</h4>
            <input type="email" name="user_email" id="user_login_email"></input>
            <h4>Password:</h4>
            <input type="password" name="user_password"id="user_login_password"></input>
            <br></br>
            <br></br>
            <input type="submit" id="login_submit" value="Login"></input>
          </Form>
          </Container>
      </div>
    );
  }
}

export default Adminlogin;
