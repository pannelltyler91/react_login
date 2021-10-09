import {Component} from 'react';
import {NavLink} from 'react-router-dom';



class Scheduleadd extends Component{
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/clients')
        .then(res => res.json())
        .then(data => {
            this.setState({
                clients:data.clients
            })
        })
    }
    
    _handleScheduleAddition = (e) =>{
        e.preventDefault();
        console.log(e)
    let data = {
        first_name:e.target.first_name.value,
        last_name:e.target.last_name.value,
        address:e.target.address.value
    }
        fetch("http://localhost:3001/api/schedule/add/" + this.props.location.state.date, {
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
      
    }
    constructor(){
        super()
        this.state={
            clients:[]
        }
    }
    render(){

        let clientList = this.state.clients.map((client) =>{
            return(
                <div >
                    <div style={{border:'3px solid black',margin:'5px'}}>
                        <form onSubmit={this._handleScheduleAddition}>
                        <h3>Name:{client.first_name} {client.last_name}</h3>
                        <input type='hidden' name='first_name' value={client.first_name}></input>
                        <input type='hidden' name='last_name' value={client.last_name}></input>
                        <h3>Address:{client.address}</h3>
                        <input type='hidden' name='address' value={client.address}></input>
                        <input type='submit' name='addToSchedule' value='Add To Schedule'></input>
                        </form>
                        
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h1>Add Schedule</h1>
                <h2><u>{this.props.location.state.date}</u></h2>
                <div style={{border:'3px solid green', width:'600px', display:'inline-block',margin:'5px'}}>
                        {clientList}
                </div>
                <NavLink to='/admin/profile'>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Scheduleadd;
