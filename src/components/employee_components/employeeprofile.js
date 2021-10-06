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
    let data = {hour:timeStamp.getHours(),minutes:timeStamp.getMinutes(),month:timeStamp.getMonth(), dayOfTheMonth:timeStamp.getDate()}
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
    this.setState({
      timeStampOut:timeStamp
    })
  }
  _handleLogout = (e) => {
    this.setState({ loggedIn: false });
    
  };
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      employee:{},
      clockInTime:'',
      clockOutTime:'',
      timeStampIn:'',
      timeStampOut:''
    };
  }

  render() {
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
          <h2><u>Daily Schedule</u></h2>
        </div>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Employeeprofile;
