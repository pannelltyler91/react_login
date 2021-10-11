import { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
class Employeelogin extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      employeeId:''
    };
  }
  _handleclick = (e) => {
    e.preventDefault();
    let data = {
      password: e.target.user_password.value,
      email: e.target.user_email.value,
    };
    fetch("http://localhost:3001/api/employee/login", {
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
          this.setState({ isLoggedIn: true, employeeId:data.id});
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      console.log(this.state.employeeId)
      return <Redirect to={{
        pathname:'/employee/profile',
        state:{id:this.state.employeeId}
        
      }} />;
    }
    return (
      <div>
        <Container>
        <h2>Employee Login</h2>
          <Card bg='light'>
            <Form onSubmit={this._handleclick}>
              <h4>Email:</h4>
              <input type="email" name="user_email" ></input>
              <h4>Password:</h4>
              <input type="password" name="user_password"></input>
              <br></br>
              <br></br>
              <input type="submit" id="login_submit" value="Login"></input>
            </Form>
          </Card>
          </Container>
      </div>
    );
  }
}

export default Employeelogin;