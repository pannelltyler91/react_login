import {Component} from 'react';
import Calendar from 'react-calendar'
import { Redirect } from "react-router-dom";

class Talendar extends Component{
    constructor() {
        super();
        this.state = {
          loggedIn: true,
          date:new Date(),
          dateSelected:false
        };
      }
    _handleCalendarChange = (date) =>{
        console.log(date);
        this.setState({
          dateSelected:true,
          date:date.toString()
        })
    }
    render(){
       
        if(this.state.dateSelected){
          return(
            
              <Redirect to={{
                pathname:'/calendarmanager',
                state:{date:this.state.date}
                
              }} />
          )
        }
        return(
            <div style={{backgroundColor:'rgb(38,57,73)',width:'75%',height:'75%',display:'block',marginLeft:'115px',marginRight:'50px',marginTop:'10px',border:'3px solid rgb(38,57,73)'}}>
                <Calendar onChange={this._handleCalendarChange} />
            </div>
            
            
        )
    }
}

export default Talendar;