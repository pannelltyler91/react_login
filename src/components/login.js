import { React, Component } from "react";
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(){
    super()
    this.state={
      isLoggedIn:false
    }
  }
  _handleclick = (e) => {
    e.preventDefault();
    let data = {
      password: e.target.user_password.value,
      email:
        e.target.user_email.value,
    };
    console.log(data)
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
        if(data.isLoggedIn){
          this.setState({isLoggedIn:true})
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Redirect to='/userProfile'/>;
    }
    return (
      <div>
        <h2>Login</h2>
      <div className="form_container">
        <form onSubmit={this._handleclick}>
          <h4>Email:</h4>
          <input type="email" name="user_email" id="user_login_email"></input>
          <h4>Password:</h4>
          <input type="password" name="user_password" id="user_login_password"></input>
          <input type="submit" id="login_submit"  value="Login"></input>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
