import {Component} from 'react';


class Employeelist extends Component{
    _handleDelete = () =>{
        console.log('delete')
    }
    _handleUpdate = () =>{
        console.log('update')
    }
    constructor(){
        super()
            this.state ={
                employees:[]
            }
        
    }
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/employees')
        .then(res => res.json())
        .then(data => {
            this.setState({
                employees:data.employees
            })
        })
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
                        <button className={employee.emp_id} onClick={this._handleUpdate}>Update</button>
                        <button className={employee.emp_id} onClick={this._handleDelete}>Delete</button>
                    </div>
                
            )
        })
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