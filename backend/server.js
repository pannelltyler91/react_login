const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const bcrypt = require("bcrypt");
const { useReducer } = require("react");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());


//admin routes ---------------------------------

app.post("/api/admin/register", (req, res) => {
    db.user.findAll({
        where: {
          user_email: req.body.email,
        },
      })
      .then((users) => {
        if (users.length == 0) {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          db.user.create({
              user_email: req.body.email,
              user_password: passwordHash,
            })
            .then(() => {
              res.json({ isRegistered: true });
            });
        } else {
          res.status(409).json({ error: "User already exists!", isRegistered: false });
        }
      });
  });

app.post("/api/admin/login", (req, res) => {
    // console.log('logged in')
    // console.log(req.body)
    // res.json({})
    db.user.findAll({
        where: {
          user_email: req.body.email,
        },
      })
      .then((users) => {
        if (users.length > 0) {
          let user = users[0];
          let passwordHash = users[0].user_password;
  
          if (bcrypt.compareSync(req.body.password, passwordHash)) {
            res.json({ isLoggedIn: true });
          } else {
            res.status(403).json({ error: "Password is incorrect", isLoggedIn: false });
          }
        } else {
          res.status(404).json({ error: "User does not exist", isLoggedIn: false });
        }
      });
  });

app.get('/api/admins', (req,res) =>{
    db.clients.findAll().then((clients)=>{
        console.log(clients)
        res.json({clients:clients})
    })
})

app.delete('/api/admin/:id', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // res.json({})
    db.clients.destroy(
        {
            where:{
                client_email:req.params.id
            }
        }
    ).then((result) =>{
        res.json({message:result})
    })
})

app.put('/api/admin/:email', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // console.log(req.body)
    db.clients.update({address:req.body.address,phone:req.body.phone,client_email:req.body.email},{
        where:{
            client_email:req.params.email
        }
    }).then((result) =>{
        console.log(result)
        res.json({updated:true})
    })
})

app.get('/api/admin/:email', (req,res) =>{
    // console.log('route is working')
    // console.log(req.params.id)
    // res.json({})
    db.user.findAll({
        where:{
            user_email:req.params.email
        }
    }).then((user) =>{
        res.json({user:user})
    })
})

  


//employee routes  -------------------------------


// employee register
app.post('/api/employee/register', (req,res) =>{
    // console.log(req.body)
    // console.log('route is working!')
    // res.send({})
    db.employees.findAll({
        where: {
          emp_email: req.body.email,
        },
      })
      .then((employees) => {
        if (employees.length == 0) {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          db.employees.create({
              emp_email: req.body.email,
              emp_password: passwordHash,
              emp_name:req.body.name,
              address:req.body.address,
              phone:req.body.phone,
              emp_id:req.body.employeeid,
              salary:req.body.salary
            })
            .then(() => {
              res.json({ isRegistered: true });
            });
        } else {
          res.status(409).json({ error: "User already exists!", isRegistered: false });
        }
      });
})

// employee login
app.post('/api/employee/login', (req, res) => {
    // console.log('logged in')
    // console.log(req.body)
    // res.json({})
    db.employees.findAll({
        where: {
          emp_email: req.body.email,
        },
      })
      .then((employees) => {
        if (employees.length > 0) {
          let employee = employees[0];
          let passwordHash = employee.emp_password;
  
          if (bcrypt.compareSync(req.body.password, passwordHash)) {
            res.json({ isLoggedIn: true });
          } else {
            res.status(403).json({ error: "Password is incorrect", isLoggedIn: false });
          }
        } else {
          res.status(404).json({ error: "User does not exist", isLoggedIn: false });
        }
      });
  });

// get all employees
app.get('/api/employees', (req,res) =>{
    db.employees.findAll().then((employees)=>{
        console.log(employees)
        res.json({employees:employees})
    })
})

//get one employee
app.get('/api/employee/:id', (req,res) =>{
    // console.log('route is working')
    // console.log(req.params.id)
    // res.json({})
    db.employees.findAll({
        where:{
            emp_id:req.params.id
        }
    }).then((employee) =>{
        res.json({employee:employee})
    })
})

//update one employee
app.put('/api/employee/:id', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // console.log(req.body)
    db.employees.update({address:req.body.address,phone:req.body.phone,salary:req.body.salary,emp_email:req.body.email},{
        where:{
            emp_id:req.params.id
        }
    }).then((result) =>{
        console.log(result)
        res.json({updated:true})
    })
})

//delete one employee
app.delete('/api/employee/:id', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // res.json({})
    db.employees.destroy(
        {
            where:{
                emp_id:req.params.id
            }
        }
    ).then((result) =>{
        res.json({message:result})
    })
})



//client routes --------------------------------


// client register
app.post('/api/client/register', (req,res)=>{
    //   console.log('route is working')
    //   console.log(req.body)
    //   res.json({})
    db.clients.findAll({
        where: {
          client_email: req.body.email,
        },
      })
      .then((clients) => {
        if (clients.length == 0) {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          db.clients.create({
              client_email: req.body.email,
              client_password: passwordHash,
              first_name:req.body.first_name,
              last_name:req.body.last_name,
              address:req.body.address,
              phone:req.body.phone
            })
            .then(() => {
              res.json({ isRegistered: true });
            });
        } else {
          res.status(409).json({ error: "User already exists!", isRegistered: false });
        }
      });
  })

  //client login
app.post('/api/client/login', (req, res) => {
    // console.log('logged in')
    // console.log(req.body)
    // res.json({})
    db.clients.findAll({
        where: {
          client_email: req.body.email,
        },
      })
      .then((clients) => {
        if (clients.length > 0) {
          let client = clients[0];
          let passwordHash = client.client_password;
  
          if (bcrypt.compareSync(req.body.password, passwordHash)) {
            res.json({ isLoggedIn: true });
          } else {
            res.status(403).json({ error: "Password is incorrect", isLoggedIn: false });
          }
        } else {
          res.status(404).json({ error: "User does not exist", isLoggedIn: false });
        }
      });
  });

  //get all clients
app.get('/api/clients', (req,res) =>{
    db.clients.findAll().then((clients)=>{
        console.log(clients)
        res.json({clients:clients})
    })
})

//delete one client
app.delete('/api/client/:id', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // res.json({})
    db.clients.destroy(
        {
            where:{
                client_email:req.params.id
            }
        }
    ).then((result) =>{
        res.json({message:result})
    })
})
//updated one client
app.put('/api/client/:email', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // console.log(req.body)
    db.clients.update({address:req.body.address,phone:req.body.phone,client_email:req.body.email},{
        where:{
            client_email:req.params.email
        }
    }).then((result) =>{
        console.log(result)
        res.json({updated:true})
    })
})
//get one client
app.get('/api/client/:email', (req,res) =>{
    // console.log('route is working')
    // console.log(req.params.id)
    // res.json({})
    db.clients.findAll({
        where:{
            client_email:req.params.email
        }
    }).then((client) =>{
        res.json({client:client})
    })
})




app.listen(3001, () => {
  console.log("App is listening on localhost:3001");
});
