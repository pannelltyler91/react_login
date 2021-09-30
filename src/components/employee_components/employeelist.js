import {Component} from 'react';


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
        console.log('delete')
        console.log(e.target.className)
        let id = e.target.className;
        fetch("http://localhost:3001/api/employee/"+ id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
     })
      .then((response) => response.json())
      .then((data) => {
          console.log("Message:", data)
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
    
    _handleUpdate = (e) =>{
        console.log('update')
        let id = e.target.id;
        console.log(id)
        fetch("http://localhost:3001/api/employee/"+ id)
        .then((response) => response.json())
        .then((data =>{
                console.log(data.employee[0].emp_name)
                this.setState({
                    updateStatus:true,
                    employeeToUpdate:data.employee[0]
                })
                console.log(this.state)
            })
        )  
    }

    _handleEmployeeUpdate = (e) =>{
        e.preventDefault();
        console.log('update employee')
        let data = {
            address:e.target.emp_address.value,
            phone:e.target.emp_phone.value,
            salary:e.target.emp_salary.value,
            email:e.target.emp_email.value

        }
        console.log(e.target.id)
        console.log(data)
        fetch("http://localhost:3001/api/employee/"+ this.state.employeeToUpdate.emp_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(data),
     })
      .then((response) => response.json())
      .then((data) => {
          console.log("Message:", data)
          
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    }
    constructor(){
        super()
            this.state ={
                employees:[],
                updateStatus:false,
                employeeToUpdate:[]
            }
        
    }
    render(){
        let employeeList = this.state.employees.map((employee) =>{
            return(
                

                    <div style={{border:'solid 3px green',width:'425px',borderRadius:'5%',padding:'25px',margin:'5px'}}>
                        <h2><u>Employee Info</u></h2>
                        <h3>Name: {employee.emp_name}</h3>
                        <div className='employeeBody'>
                            <h4>Address: {employee.address}</h4>
                            <h4>Phone: {employee.phone}</h4>
                            <h4>Employee Id: {employee.emp_id}</h4>
                            <h4>Salary: {employee.salary}</h4>
                            <h4>Email: {employee.emp_email}</h4>
                        </div>
                        <button id={employee.emp_id} onClick={this._handleUpdate}>Update</button>
                        <button className={employee.emp_id} onClick={this._handleDelete}>Delete</button>
                    </div>
                
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
        return(
            <div >
                <h1>Employee List</h1>
                <div style={{display:'inline-flex'}}>
                    {employeeList}
                </div>

            </div>
        )
    }
}

export default Employeelist;