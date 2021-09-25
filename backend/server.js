const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models')
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());

app.post('/register', (req,res) =>{
  db.user.findAll ({
      where:{
          user_email:req.body.email
      }
  }).then((users) =>{
      if(users.length == 0){
        const passwordHash =  bcrypt.hashSync(req.body.password,10)
          db.user.create({
              user_email:req.body.email,
              user_password:passwordHash
          }).then(() =>{
              res.json({message:'User Registered'})
          })
      }else{
          res.status(409).json({error:'User already exists!'})
      }
  })
})

app.post('/login', (req,res) =>{
    console.log('logged in')
    consol.log(req.body)
    res.json({})
})

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})



app.listen(3001, () => {
    console.log('App is listening on localhost:3001')
   })