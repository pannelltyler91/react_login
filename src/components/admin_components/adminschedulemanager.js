import {Component} from 'react';
import {NavLink} from 'react-router-dom';



class Schedulemanager extends Component{
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/clients')
        .then(res => res.json())
        .then(data => {
            this.setState({
                clients:data.clients
            })
            
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
                        <h3>Name:{client.first_name} {client.last_name}</h3>
                        <h3>Address:{client.address}</h3>
                        <input type='checkbox' name='addToSchedule'></input>
                        
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h1>Schedule Manager</h1>
                <div style={{border:'3px solid green', width:'600px', display:'inline-block',margin:'5px'}}>
                    <form>
                        {clientList}
                        <input type='submit' value='Add To Schedule'></input>
                    </form>
                </div>
                <NavLink to='admin/profile'>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Schedulemanager;
