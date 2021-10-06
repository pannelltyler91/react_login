import {Component} from 'react';
import Container from 'react-bootstrap/Container'


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
                

                    <div style={{border:'solid 3px green',width:'425px',borderRadius:'5%',padding:'25px',margin:'5px'}}>
                        <h2><u>Admin Info</u></h2>
                        <h3>Admin: {admin.user_email}</h3>
                        <div className='adminBody'>
                            <h4>Email: {admin.user_email}</h4>
                        </div>
                        <button id={admin.user_email} onClick={this._handleUpdateRender}>Update</button>
                        <button className={admin.user_email} onClick={this._handleDelete}>Delete</button>
                    </div>
                
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
            <div >
                <h1>Admin List</h1>
                <Container>
                    {adminList}
                </Container>
                <a href='/admin/profile'>Back to Admin Profile</a>

            </div>
        )
    }
}

export default Adminlist;