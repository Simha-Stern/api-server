import express from "express";
const app = express();
app.use(express.json());
const port = 3000;


const users = [
  {
    id: "1",
    email: "aaa@aa.aa",
    password: "12345678"
  },
  {
    id: "2",
    email: "aaa@aa.aa",
    password: "12345678"
  },
  {
    id: "3",
    email: "aaa@aa.aa",
    password: "12345678"
  },
];

app.get("/", (req, res) => {
    res.send("working");
  });

app.get("/users", (req, res) => {
  res.send({users});
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (user !== -1){
      res.send(user);
  }else{
    res.status(404).send('not definde')
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  users.push(userToAdd);
  res.send("user added well!");
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

})

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
