import {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Scheduleview extends Component{
    constructor(){
        super()
        this.state={
            schedule:[]
        }
    }
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/schedule/view/'+ this.props.location.state.date)
        .then(res => res.json())
        .then(data => {
            this.setState({
                schedule:data.schedule
            })
            console.log(data.message,data.schedule)
            
        })
    }
    render(){
        let schedule = this.state.schedule.map((client) =>{
            return(
                <div >
                    <div style={{border:'3px solid black',margin:'5px', width:'600px'}}>
                        
                        <h3>Name:{client.first_name} {client.last_name}</h3>
                        
                        <h3>Address:{client.address}</h3>
                        
                        
                        
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h1>Schedule View</h1>
                <h2>{this.props.location.state.date}</h2>
                {schedule}
                <NavLink to='/admin/profile'>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Scheduleview;