const express = require("express");
const app = express();

app.use(express.json());

let id = 1;
let users = [];

app.post("/signup", (req, res) =>{
  const user = req.body;

  const doesExist = users.find((u) => u.email === user.email)
  
  if(doesExist){
    return res.sendStatus(400);
  }

  users.push({
    id: id++,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  res.status(201).send("Signup successful");
})

app.post("/login", (req, res)=>{
  const user = req.body;

  const doesExist = users.find((u) => u.email === user.email && u.password === user.password);
  
  if (!doesExist){
    return res.sendStatus(401);
  }

  res.status(200).json({
    id: doesExist.id,
    email: doesExist.email,
    firstName: doesExist.firstName,
    lastName: doesExist.lastName,
    authToken: "token",
  })
})

app.get("/data", (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.sendStatus(401);
  }

  const usersToReturn = users.map((u) => ({
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
  }));

  res.json({
    users: usersToReturn,
  });
});


app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
