const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const bcrypt = require("bcrypt");
const { useReducer } = require("react");
const {Op} = require('sequelize')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());


//admin routes ---------------------------------


// register admin

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

// admin login

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

// get all admins

app.get('/api/admins', (req,res) =>{
    db.user.findAll().then((admins)=>{
        console.log(admins)
        res.json({admins:admins})
    })
})

//delete one admin

app.delete('/api/admin/:id', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // res.json({})
    db.user.destroy(
        {
            where:{
                user_email:req.params.id
            }
        }
    ).then((result) =>{
        res.json({message:result})
    })
})

//update one admin
app.put('/api/admin/:email', (req,res) =>{
    // console.log('route working')
    // console.log(req.params.id)
    // console.log(req.body)
    db.user.update({user_email:req.body.email},{
        where:{
            user_email:req.params.email
        }
    }).then((result) =>{
        console.log(result)
        res.json({updated:true})
    })
})

//get one admin
app.get('/api/admin/:email', (req,res) =>{
    // console.log('route is working')
    // console.log(req.params.id)
    // res.json({})
    db.user.findAll({
        where:{
            user_email:req.params.email
        }
    }).then((admin) =>{
        res.json({admin:admin})
    })
})

//schedule routes -------------------------------------

//add clients to that days schedule
app.post('/api/schedule/add/:date', (req,res) =>{
  // console.log(req.params.date)
  // console.log(req.body)
  // res.json({message:'route is working'})
  db.schedule.findAll({
    where:{
      date:req.params.date.toString(),
      address:req.body.address
    }
  }).then((schedule) =>{
    if(schedule.length == 0){
      db.schedule.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        address:req.body.address,
        date:req.params.date.toString()
      })
      res.json({message:'Added to Schedule'})
    } else{
      res.status(409).json({message:'Already added to schedule.'})
    }
  })
})

//get all clients for one days schedule
app.get('/api/schedule/view/:date', (req,res) =>{
  // console.log(req.params.date)
  // res.json({message:'route working'})
  db.schedule.findAll({
    where:{
      date:req.params.date.toString()
    }
  }).then((schedule) =>{
    res.json({message:'found schedule',schedule:schedule })
  })
})

//remove client from daily schedule
app.delete('/api/schedule/remove/:date', (req, res) =>{
  console.log(req.params.date)
  console.log(req.body)
  db.schedule.destroy({
    where:{
      date:req.params.date.toString(),
      address:req.body.address
    }
  }).then((results) =>{
    res.json({message:'Removed'})
  })
})

//pushes client to next day of schedule
app.put('/api/schedule/push/:date', (req,res) =>{
  console.log(req.params.date)
  let date = new Date(req.params.date)
  let newDay = date.getDate() + 1
  date.setDate(newDay);
  console.log(date)
  console.log(req.body)
 db.schedule.update({date:date.toString()}, {
   where:{
     address:req.body.address,
     date:req.params.date.toString()
   }
 }).then((results) => {
   res.json({message:'Pushed to Next Day'})
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
          let id = employees[0].emp_id
  
          if (bcrypt.compareSync(req.body.password, passwordHash)) {
            res.json({ isLoggedIn: true, id:id });
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


//employee time routes ----------------------------

//single employee clocks in
app.post('/api/employee/clockin/:id', (req,res) =>{
  console.log(req.body)
  console.log(req.params.id)
  
  const date = req.body.month + 1 + '/' + req.body.dayOfTheMonth + '/' + req.body.year;
  console.log(date)
  db.employeeTime.findAll({
    where:{
       employee_id: req.params.id ,  
       date: date 
    }
  }).then((employeetime)=>{
    if(employeetime.length == 0){

      db.employeeTime.create({
        clockInHour:req.body.hour,
        clockInMinutes:req.body.minutes,
        employee_id:req.params.id,
        date:date,
        timeStamp:req.body.timeStamp
    
    
      })
      res.json({message:'Clocked In'})
    } else{
      res.status(409).json({message:'Already clocked in for the day'})
    }
  })
  
})

//get single employess times for the week
app.get('/api/employee/time/:id', (req,res) =>{
  console.log(req.params.id)
  let date = new Date()  
  let first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6
  let firstday = new Date(date.setDate(first));
  let lastday = new Date(date.setDate(last));
  console.log(firstday,lastday)

  db.employeeTime.findAll({
    where:{
      employee_id:req.params.id,
      timeStamp: {[Op.between] : [firstday , lastday ]}
    }
  }).then((eTime) =>{
    console.log(eTime);
    res.json({message:eTime})
  })
})

//single employee clocks out
app.post('/api/employee/clockout/:id', (req,res) =>{
  console.log(req.body)
  console.log(req.params.id)
  const date = req.body.month + 1 + '/' + req.body.dayOfTheMonth + '/' + req.body.year;
  console.log(date)
  db.employeeTime.findAll({
    where:{
       employee_id: req.params.id ,  
       date: date 
    }
  }).then((employeetime)=>{
    if(employeetime[0].clockOutHour !== ''){
      let singleEmployeeTime = employeetime[0]
      let singleEmployeeTimeDate = singleEmployeeTime.date
      let singleEmployeeId = singleEmployeeTime.employee_id;
      db.employeeTime.update({clockOutHour:req.body.hour,clockOutMinutes:req.body.minutes},{
        where:{
            employee_id:req.params.id,
            date:date
        }
    })
      res.json({message:'Clocked Out'})
    } else{
      res.json({message:'Employee has already clocked out'})
      
    }
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
