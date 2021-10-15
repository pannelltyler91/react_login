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
    _handlePush = (e) =>{
        e.preventDefault();
        console.log('Pushed')
        fetch("http://localhost:3001/api/schedule/push/" + this.props.location.state.date, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({address:e.target.address.value}),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message)
              window.location.reload()
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        
    }
    _handleRemove = (e) =>{
        e.preventDefault();
        console.log('Removed')
        console.log(e.target.address.value)
        fetch("http://localhost:3001/api/schedule/remove/" + this.props.location.state.date, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({address:e.target.address.value}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    render(){
        let schedule = this.state.schedule.map((client) =>{
            return(
                <div >
                    
                    <div style={{border:'3px solid #006466',margin:'5px', width:'600px',backgroundColor:'rgb(38,57,73)', color:'#006466'}}>
                        <h3 key={client.id}>Name:{client.first_name} {client.last_name}</h3>
                        <h3 key={client.address}>Address:{client.address}</h3>
                        <div style={{display:'flex'}}>
                        <form onSubmit={this._handleRemove} style={{margin:'5px'}}>
                        <input type='hidden' name='address' value={client.address}></input>
                        <input type='submit' value='Remove' style={{backgroundColor:'#212F45',color:'#006466',fontWeight:'bold'}} ></input>
                        </form>
                        <form onSubmit={this._handlePush} style={{margin:'5px',backgroundColor:'#212F45',color:'#006466'}}>
                        <input type='hidden' name='address' value={client.address}></input>
                        <input type='submit' value='Push to Next Day' style={{backgroundColor:'#212F45',color:'#006466',fontWeight:'bold'}}></input>                          
                        </form>
                      </div>
                    </div>
                    
                </div>
            )
        })
        return(
            <div style={{color:'#006466'}}>
                <h1>Schedule View</h1>
                <h2>{this.props.location.state.date}</h2>
                {schedule}
                <NavLink to='/admin/profile' style={{color:'#006466'}}>Return to Admin Profile</NavLink>
            </div>
        )
    }
}

export default Scheduleview;