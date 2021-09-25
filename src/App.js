import {React, Component} from 'react';
import './App.css';
import Register from "./components/register";
import Login from './components/login';
import { BrowserRouter as Router,NavLink,Route,Switch} from 'react-router-dom'

class App extends Component {

  render(){
    return (
      <Router>
        <NavLink to='/login'>Login</NavLink> |  <NavLink to='/register'>Register</NavLink>


      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>

      </Switch>
      </Router>

    
    )
  }
  }

export default App;
