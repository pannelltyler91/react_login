import {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Calendarmanager extends Component{
    render(){
        return(
            <div>
                <h1>Calendar Manager</h1>
                <div>
                    <h3>Date:<u>{this.props.location.state.date}</u></h3>
                    <NavLink to='/schedulemanager'>Add Schedule</NavLink>
                    <h2>Check Clients Completed for the Day</h2>

                </div>
                <NavLink to='/admin/profile'>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Calendarmanager;