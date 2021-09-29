import { React, Component } from "react";
import { Redirect } from "react-router-dom";

class Register extends Component {
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
    fetch("http://localhost:3001/api/register", {
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
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="title">
          <h2>Register</h2>
        </div>
        <div className="form_container">
          <form onSubmit={this._handleclick}>
            <h4>Email:</h4>
            <input type="email" name="user_email" id="user_email"></input>
            <h4>Password:</h4>
            <input
              type="password"
              name="user_password"
              id="user_password"
            ></input>
            <input type="submit" id="register_submit" value="Register"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
