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

app.post("/api/register", (req, res) => {
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

app.post("/api/login", (req, res) => {
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

app.listen(3001, () => {
  console.log("App is listening on localhost:3001");
});
