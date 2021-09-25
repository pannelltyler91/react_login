import { React, Component } from "react";

class Register extends Component {
  _handleclick = (e) => {
    e.preventDefault();
    let data = {
      password: e.target.previousElementSibling.value,
      email:
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.value,
    };
    fetch("http://localhost:3001/register", {
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
        <div className='title'>
        <h2>Register</h2>
        </div>
        <form>
          <h4>Email:</h4>
          <input type="email" name="user_email" id="user_email"></input>
          <h4>Password:</h4>
          <input type="password" name="user_password" id="user_password" ></input>
          <input type="submit" id="register_submit" onClick={this._handleclick}value="Register"></input>
        </form>
      </div>
    );
  }
}

export default Register;