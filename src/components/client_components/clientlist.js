import {Component} from 'react';
import Container from 'react-bootstrap/Container'


class Clientlist extends Component{
    componentDidMount = () =>{
        fetch('http://localhost:3001/api/clients')
        .then(res => res.json())
        .then(data => {
            this.setState({
                clients:data.clients
            })
            
        })
    }
    _handleDelete = (e) =>{
        let id = e.target.className;
        fetch("http://localhost:3001/api/client/"+ id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/clients')
        .then(res => res.json())
        .then(data => {
            this.setState({
                clients:data.clients
            })
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
    
    _handleUpdateRender = (e) =>{
        let id = e.target.id;
        fetch("http://localhost:3001/api/client/"+ id)
        .then((response) => response.json())
        .then((data =>{
                this.setState({
                    updateStatus:true,
                    clientToUpdate:data.client[0]
                })
            })
        )  
    }

    _handleClientUpdate = (e) =>{
        e.preventDefault();
        let data = {
            address:e.target.client_address.value,
            phone:e.target.client_phone.value,
            email:e.target.client_email.value

        }
        fetch("http://localhost:3001/api/client/"+ this.state.clientToUpdate.client_email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(data),
     })
      .then((response) => response.json())
      .then((data) => {
          fetch('http://localhost:3001/api/clients')
          .then(res => res.json())
          .then(data => {
              this.setState({
                  clients:data.clients
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
                clients:[],
                updateStatus:false,
                clientToUpdate:[]
            }
        
    }
    render(){
        let clientList = this.state.clients.map((client) =>{
            return(
                

                    <div style={{border:'solid 3px green',width:'425px',borderRadius:'5%',padding:'25px',margin:'5px'}}>
                        <h2><u>Client Info</u></h2>
                        <h3>Name: {client.first_name} {client.last_name}</h3>
                        <div className='clientBody'>
                            <h4>Address: {client.address}</h4>
                            <h4>Phone: {client.phone}</h4>
                            <h4>Email: {client.client_email}</h4>
                        </div>
                        <button id={client.client_email} onClick={this._handleUpdateRender}>Update</button>
                        <button className={client.client_email} onClick={this._handleDelete}>Delete</button>
                    </div>
                
            )
        })

        if(this.state.updateStatus){
            return(
                <div>                                       
                    <h3>{this.state.clientToUpdate.first_name} {this.state.clientToUpdate.last_name}</h3>
                    <form onSubmit={this._handleClientUpdate}>  
                        <h4>Address:</h4>
                        <input type="text" defaultValue={this.state.clientToUpdate.address} name="client_address"></input>
                        <h4>Phone:</h4>
                        <input type="text" defaultValue={this.state.clientToUpdate.phone} name="client_phone"></input>
                        <h4>Email:</h4>
                        <input type="text" defaultValue={this.state.clientToUpdate.client_email} name="client_email"></input>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Update" id={this.state.clientToUpdate.client_email}></input>
                    </form>
                </div>
            )
        }
        return(
            <div >
                <h1>Client List</h1>
                <Container>
                    {clientList}
                </Container>
                <a href='/admin/profile'>Back to Admin Profile</a>

            </div>
        )
    }
}

export default Clientlist;