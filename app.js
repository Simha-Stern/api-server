import express from "express";

const app = express();
const port = 3000;

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import routes from "routes";
// const router = routes();

import validator from "email-validator";
import passValid from 'password-validator';
const schema = new passValid();
schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().not().spaces();

import jsonfile  from "jsonfile";

app.use(express.json());
const file = 'data.json';



const users = [
  {
    id: "1",
    email: "aaa@aa.aa",
    password: "12345678"
  },
  {
    id: "2",
    email: "bbb@aa.aa",
    password: "12345678"
  },
  {
    id: "3",
    email: "ccc@aa.aa",
    password: "12345678"
  },
];

const saltRounds = 10;
let myPlaintextPassword = null
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // console.log(hash);
});

app.get("/", (req, res) => {
    res.send("working");
  });

app.get("/users", (req, res) => {
  res.send({users});
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (user){
      res.send(user);
  }else{
    res.status(404).send('not definde')
  }
});

app.post("/useradd", (req, res) => {
  const userToAdd = req.body;
  if (!validator.validate(userToAdd.email)){
    res.send("email us not gud")
  } else if (!schema.validate(userToAdd.password)){
    res.send("password us not gud");
  }else{
  bcrypt.hash(userToAdd.password, saltRounds, function(err, hash) {

  userToAdd.password = hash;
});

  userToAdd.id = uuidv4();
  users.push(userToAdd);
  res.send("user added well!");
}
  res.send("email us not gud");
});

app.put("/users/:id", (req, res) => {
    const userToAdd = req.body;
    const id = req.params.id;
    const oldUser = users.find((user) => (user.id === id))
    oldUser.email = userToAdd.email;
    oldUser.password = userToAdd.password;
    res.send("user update well!");
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deletUser = users.findIndex((user) => user.id === id);
    users.splice(deletUser, 1);
    res.send("user delet well!");

});

app.post("/users", (req, res) => {
    const userEmailTocheck = req.body.email;
    const userByEmail = users.find((user) => user.email === userEmailTocheck)
    const password = req.body.password
    const match = bcrypt.compare(password, userByEmail.password)
    if (userByEmail){
      if (match){
        res.send('User is connected');
    }}else{
      res.status(404).send('wrong credentials')
    }
  });



app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
