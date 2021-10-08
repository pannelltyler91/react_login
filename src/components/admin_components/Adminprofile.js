import { Component } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";

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
      <div>
        <h1>Admin Profile</h1>
        <div>
        <h3>Views</h3>
        <NavLink to="/client/list"> See All Clients</NavLink> |{" "}
        <NavLink to="/employee/list"> See All Employees</NavLink> |{" "}
        <NavLink to="/admin/list"> See All Admins</NavLink> |{" "}
        </div>
        <div style={{width:'800px',margin:'5px'}}>
          <Calendar onChange={this._handleCalendarChange} />
        </div>
        <div>
          <h3>Add</h3>
        <NavLink to="/client/add"> Add Client</NavLink> |{" "}
        <NavLink to="/employee/register"> Add Employee</NavLink> |{" "}
        <NavLink to="/admin/register"> Add Admin</NavLink> |{" "}
        </div>
        <div>
          <button onClick={this._handleLogout}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default Adminprofile;
