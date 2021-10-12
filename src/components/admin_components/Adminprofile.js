import { Component } from "react";
import { Redirect } from "react-router-dom";
import Calendar from "react-calendar";
import Card from 'react-bootstrap/Card';
import Sidebar from "../sidebar";
import Button from 'react-bootstrap/Button'

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

  _handleCalendarChange = (date) =>{
    console.log(date);
    this.setState({
      dateSelected:true,
      date:date.toString()
    })
    
    
    
  }

  render() {
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return <Redirect to="/admin/logout" />;
    }
    if(this.state.dateSelected){
      return(
        
          <Redirect to={{
            pathname:'/calendarmanager',
            state:{date:this.state.date}
            
          }} />
      )
    }
   
    return (
      <div style={{backgroundColor:'rgb(38,57,73)',height:'100vh', width:'100vw'}}>
        <h1>Admin Profile</h1>
        <Sidebar/>
        <Card style={{width:'800px',margin:'5px',backgroundColor:'#469D89', border:'solid 6px #469D89',color:'#469D89'}}>
          <Calendar style={{backgroundColor:'#99E2B4'}} onChange={this._handleCalendarChange} />
        </Card>
          <Button style={{backgroundColor:'#778da9'}} onClick={this._handleLogout}>Log Out</Button>
      </div>
    );
  }
}

export default Adminprofile;
