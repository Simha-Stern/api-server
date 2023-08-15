import express from "express";
const app = express();
const port = 3000;

const users = [
  {
    id: "1",
    email: "aaa@aa.aa",
    password: "12345678",
  },
  {
    id: "2",
    email: "aaa@aa.aa",
    password: "12345678",
  },
  {
    id: "3",
    email: "aaa@aa.aa",
    password: "12345678",
  },
];


// app.get("/", (req, res) => {
//     res.send("working");
//   });

app.get("/users", (req, res) => {
  res.send({users});
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(users.find((user)=>user.id = id));
});

app.post('/', (req,res) => {
    res.send()
})