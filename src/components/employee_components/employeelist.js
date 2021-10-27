import {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'


class Employeelist extends Component{
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/employees')
        .then(res => res.json())
        .then(data => {
            this.setState({
                employees:data.employees
            })
            
        })
    }
    _handleDelete = (e) =>{
        let id = e.target.className;
        fetch("http://localhost:3001/api/employee/"+ id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/employees')
        .then(res => res.json())
        .then(data => {
            this.setState({
                employees:data.employees
            })
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
    
    _handleUpdateRender = (e) =>{
        let id = e.target.id;
        fetch("http://localhost:3001/api/employee/"+ id)
        .then((response) => response.json())
        .then((data =>{
                this.setState({
                    updateStatus:true,
                    employeeToUpdate:data.employee[0]
                })
            })
        )  
    }
    _handleTimesheetRender = (e) => {
        console.log(e.target.className)
        fetch('http://localhost:3001/api/employee/time/'+ e.target.className)
        .then(res => res.json())
        .then(data =>{
          console.log(data.message)
          this.setState  ({
            employeeTime:data.message,
            timeRecieved:true
          })
          console.log(this.state)
        })
        
      };
    _handleEmployeeUpdate = (e) =>{
        e.preventDefault();
        let data = {
            address:e.target.emp_address.value,
            phone:e.target.emp_phone.value,
            salary:e.target.emp_salary.value,
            email:e.target.emp_email.value

        }
        fetch("http://localhost:3001/api/employee/"+ this.state.employeeToUpdate.emp_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(data),
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/employees')
          .then(res => res.json())
          .then(data => {
              this.setState({
                  employees:data.employees
              })
          
        })
        
          this.setState({
              updateStatus:false
          })
      })
     

    }
       constructor(){
        super()
            this.state ={
                employees:[],
                updateStatus:false,
                employeeToUpdate:[],
                employeeTime:[],
                timeReceived:false
            }
        
    }
    render(){
        let employeeWeekTime = this.state.employeeTime.map((date)=>{
            return(
              <div style={{border:'3px solid green',width:'300px',display:'inline-block',margin:'5px'}}>
                <h1>'s Time This Week</h1>
                <div>
                  <h3>{date.date}</h3>
                  <h4>ClockIn Time</h4>
                  <p>{date.clockInHour}:{date.clockInMinutes}</p>
                </div>
                <div>
                  <h4>ClockOut Time</h4>
                  <p>{date.clockOutHour}:{date.clockOutMinutes}</p>
                </div>
                <div>
                  <h4>Total Daily Hours</h4>
                  <p>{(((date.clockOutHour*60)+ date.clockOutMinutes) - ((date.clockInHour*60)+ date.clockInMinutes) ) /60}</p>
                </div>
              </div>
            )
          })
        let employeeList = this.state.employees.map((employee) =>{
            return(
                

                    <Card style={{display:'flex',border:'solid 3px #006466',width:'25%',padding:'25px',margin:'5px',backgroundColor:'#272640',color:'#006466'}}>
                        <h2><u>Employee Info</u></h2>
                        <h3>Name: {employee.emp_name}</h3>
                        <div className='employeeBody'>
                            <h4>Address: {employee.address}</h4>
                            <h4>Phone: {employee.phone}</h4>
                            <h4>Employee Id: {employee.emp_id}</h4>
                            <h4>Salary: {employee.salary}</h4>
                            <h4>Email: {employee.emp_email}</h4>
                        </div>
                        <div style={{width:'40px',display:'flex'}}>
                        <button id={employee.emp_id} onClick={this._handleUpdateRender} style={{backgroundColor:'#006466',color:'#212F45',margin:'5px',fontWeight:'bold'}}>Update</button>
                        <button className={employee.emp_id} onClick={this._handleDelete} style={{backgroundColor:'#006466',color:'#212F45',margin:'5px',fontWeight:'bold'}}>Delete</button>
                        <button className={employee.emp_id} onClick={this._handleTimesheetRender} style={{backgroundColor:'#006466',color:'#212F45',margin:'5px',fontWeight:'bold'}}>Timesheet</button>
                        </div>
                    </Card>
                
            )
        })

        if(this.state.updateStatus){
            return(
                <div>                                       
                   <h3>{this.state.employeeToUpdate.emp_name}</h3>
                    <form onSubmit={this._handleEmployeeUpdate}>  
                        <h4>Address:</h4>
                        <input type="text" defaultValue={this.state.employeeToUpdate.address} name="emp_address"></input>
                        <h4>Phone:</h4>
                        <input type="text" defaultValue={this.state.employeeToUpdate.phone} name="emp_phone"></input>
                        <h4>Salary:</h4>
                        <input type="number" defaultValue={this.state.employeeToUpdate.salary} name="emp_salary"></input>
                        <h4>Email:</h4>
                        <input type="text" defaultValue={this.state.employeeToUpdate.emp_email} name="emp_email"></input>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Update" id={this.state.employeeToUpdate.emp_id}></input>
                    </form>
                </div>
            )
        }
        if(this.state.timeReceived){
            return(
                <div>
                    {employeeWeekTime}
                </div>
            )
        }
        return(
    <Container style={{marginLeft:'5px',display:'flex-box'}}>
                <h1 style={{color:'#006466',marginBottom:'5px',marginLeft:'5px'}}>Employee List</h1>
                
                    {employeeList}
                
                <a href='/admin/profile' style={{color:'#006466'}}>Back to Admin Profile</a>

            </Container>
        )
    }
}

export default Employeelist;