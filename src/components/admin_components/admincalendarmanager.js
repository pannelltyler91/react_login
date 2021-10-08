import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Calendarmanager extends Component{
    constructor(){
        super()
        this.state={
            addSchedule:false,
            seeSchedule:false
        }
    }

    _handleAddClick = (e) =>{
        this.setState({
            addSchedule:true
        })

    }
    _handleSeeClick = (e) =>{
        this.setState({
            seeSchedule:true
        })

    }
    
    render(){
        if(this.state.addSchedule ){
            return(
                <Redirect to={{
                    pathname:'/schedule/add',
                    state:{date:this.props.location.state.date}
                  }} />
            )
        }
        if(this.state.seeSchedule){
            return(
                <Redirect to={{
                    pathname:'/schedule/view',
                    state:{date:this.props.location.state.date}
                  }} />
            )
        }
      
        return(
            <div>
                <h1>Calendar Manager</h1>
                <div>
                    <h3>Date:<u>{this.props.location.state.date}</u></h3>
                    <button onClick={this._handleAddClick}>Add Schedule</button>
                    <button onClick={this._handleSeeClick}>See Schedule</button>
                    

                </div>
                <NavLink to='/admin/profile'>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Calendarmanager;