import { Component } from "react";
import { Redirect } from "react-router-dom";



class Employeeprofile extends Component {

  componentDidMount = () =>{
    fetch('http://localhost:3001/api/employee/'+ this.props.location.state.id)
    .then(res => res.json())
    .then(data => {
      console.log(data.employee[0])
      this.setState({employee:data.employee[0]})
    })
  }
  
  _handleClockIn = (e) =>{
    e.preventDefault();
    console.log(e)
    let timeStamp = new Date()
    let data = {hour:timeStamp.getHours(),minutes:timeStamp.getMinutes(),month:timeStamp.getMonth(), dayOfTheMonth:timeStamp.getDate(),year:timeStamp.getFullYear(), timeStamp:timeStamp}
    let empId = this.state.employee.emp_id
    this.setState({
      timeStampIn:timeStamp
    })
    fetch("http://localhost:3001/api/employee/clockin/" + empId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  _handleClockOut = (e) =>{
    e.preventDefault();
    console.log(e)
    let timeStamp = new Date()
    let empId = this.state.employee.emp_id
    let data = {hour:timeStamp.getHours(),minutes:timeStamp.getMinutes(),month:timeStamp.getMonth(), dayOfTheMonth:timeStamp.getDate(),year:timeStamp.getFullYear(), timeStamp:timeStamp}
    this.setState({
      timeStampOut:timeStamp
    })
    fetch("http://localhost:3001/api/employee/clockout/" + empId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  _handleLogout = (e) => {
    this.setState({ loggedIn: false });
    
  };
  _handleTest = (e) => {
    fetch('http://localhost:3001/api/employee/time/'+ this.state.employee.emp_id)
    .then(res => res.json())
    .then(data =>{
      console.log(data.message)
      this.setState = {
        employeeTime:data.message,
        timeRecieved:true
      }
    })
    
  };
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      employee:{},
      clockInTime:'',
      clockOutTime:'',
      timeStampIn:'',
      timeStampOut:'',
      employeeTime:[],
      timeRecieved:false
    };
  }

  render() {
   

    let employeeWeekTime = this.state.employeeTime.map((date)=>{
      return(
        <div>
          <h1>{this.state.employee.emp_name}'s Time This Week</h1>
          <div>
            <h4>ClockIn Time</h4>
            <p>{date.clockInHour}:{date.clockInMinutes}</p>
          </div>
          <div>
            <h4>ClockOut Time</h4>
            <p>{date.clockOutHour}:{date.clockOutMinutes}</p>
          </div>
          <div>
            <h4>Total Daily Hours</h4>
            <p>{(((date.clockOutHour * 60) + date.clockOutMinutes) - ((date.clockInHour * 60) + date.clockInMinutes)/60)}</p>
          </div>
        </div>
      )
    })
    if(this.state.timeRecieved){
      return(
        {employeeWeekTime}
      )
    }
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return <Redirect to="/employee/logout" />;
    }
    return (
      <div>
        <h1><u>{this.state.employee.emp_name}'s' Profile</u></h1>
        <div id='employeeClockIn'style={{border:'solid 3px green',width:'600px',borderRadius:'3%',padding:'15px',margin:'5px'}}>
          <h3><u>Clock-In</u></h3>
          <input type="button" name='clockIn' value='Clock In' onClick={this._handleClockIn}></input>
          <h4><i>{this.state.timeStampIn.toString()}</i></h4>
        </div>
        <div id='employeeClockOut' style={{border:'solid 3px green',width:'600px',borderRadius:'3%',padding:'15px',margin:'5px'}}>
        <h3><u>Clock-Out</u></h3>
          <input type="button" name='clockOut' value="Clock Out" onClick={this._handleClockOut}></input>
          <h4><i>{this.state.timeStampOut.toString()}</i></h4>
        </div>
      <div>
          <h2><u>Timesheet</u></h2>
          <button onClick={this._handleTest}>Get This Weeks Time</button>
          

        </div>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Employeeprofile;
