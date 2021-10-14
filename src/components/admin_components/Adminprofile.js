import { Component } from "react";
import Sidebar from "../sidebar";
import Button from 'react-bootstrap/Button'
import Talendar from '../calendar';
import {Redirect} from 'react-router-dom';



class Adminprofile extends Component {
  _handleLogout = (e) => {
    this.setState({ loggedIn: false });
  };
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      date:new Date(),
      dateSelected:false
    };
  }

  

  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return <Redirect to="/admin/logout" />;
    }
    return (
      <div style={{backgroundColor:'#212F45'}}>
        <Sidebar/>
        <div id='talendar'>
          <h2>Calendar</h2>
        <Talendar/>
        </div>
        
      </div>
    );
  }
}

export default Adminprofile;
