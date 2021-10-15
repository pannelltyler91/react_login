import {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'


class Adminlist extends Component{
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/admins')
        .then(res => res.json())
        .then(data => {
            this.setState({
                admins:data.admins
            })
            
        })
    }
    _handleDelete = (e) =>{
        let id = e.target.className;
        fetch("http://localhost:3001/api/admin/"+ id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/admins')
        .then(res => res.json())
        .then(data => {
            this.setState({
                admins:data.admins
            })
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
    
    _handleUpdateRender = (e) =>{
        let id = e.target.id;
        fetch("http://localhost:3001/api/admin/"+ id)
        .then((response) => response.json())
        .then((data =>{
                this.setState({
                    updateStatus:true,
                    adminToUpdate:data.admin[0]
                })
            })
        )  
    }

    _handleAdminUpdate = (e) =>{
        e.preventDefault();
        let data = {
            email:e.target.admin_email.value

        }
        fetch("http://localhost:3001/api/admin/"+ this.state.adminToUpdate.user_email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(data),
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/admins')
          .then(res => res.json())
          .then(data => {
              this.setState({
                  admins:data.admins
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
                admins:[],
                updateStatus:false,
                adminToUpdate:[]
            }
        
    }
    render(){
        let adminList = this.state.admins.map((admin) =>{
            return(
                

                    <Card style={{display:'flex',border:'solid 3px #006466',width:'25%',padding:'25px',margin:'5px',backgroundColor:'#272640',color:'#006466'}}>
                        <h2><u>Admin Info</u></h2>
                        <h3>Admin: {admin.user_email}</h3>
                        <div className='adminBody'>
                            <h4>Email: {admin.user_email}</h4>
                        </div>
                        <div style={{width:'40px',display:'flex'}}>
                        <button id={admin.user_email} onClick={this._handleUpdateRender} style={{backgroundColor:'#006466',color:'#212F45',margin:'5px',fontWeight:'bold'}}>Update</button>
                        <button className={admin.user_email} onClick={this._handleDelete} style={{backgroundColor:'#006466',color:'#212F45',margin:'5px',fontWeight:'bold'}}>Delete</button>
                        </div>
                    </Card>
                
            )
        })

        if(this.state.updateStatus){
            return(
                <div>                                       
                    <h3>{this.state.adminToUpdate.user_email} </h3>
                    <form onSubmit={this._handleAdminUpdate}>  
                        <h4>Email:</h4>
                        <input type="text" defaultValue={this.state.adminToUpdate.user_email} name="admin_email"></input>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Update" id={this.state.adminToUpdate.user_email}></input>
                    </form>
                </div>
            )
        }
        return(
            <div style={{height:'100vh'}}>
                <h1 style={{color:'#006466',marginBottom:'5px',marginLeft:'5px'}}>Admin List</h1>
                
                    {adminList}
               
                <a href='/admin/profile'style={{color:'#006466'}}>Back to Admin Profile</a>

            </div>
        )
    }
}

export default Adminlist;