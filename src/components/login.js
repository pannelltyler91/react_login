import { React, Component } from "react";

class Login extends Component {
  handleclick = (e) => {
    e.preventDefault();
    let data = {
      password: e.target.previousElementSibling.value,
      email:
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.value,
    };
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form>
          <h4>Email:</h4>
          <input type="email" name="user_email" id="user_login_email"></input>
          <h4>Password:</h4>
          <input type="password" name="user_password" id="user_login_password"></input>
          <input type="submit" id="login_submit" onClick={this._handleclick} value="Login"></input>
        </form>
      </div>
    );
  }
}

export default Login;
