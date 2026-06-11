const express = require("express")
const app = express();

let id = 1;
let todos = []

app.use(express.json());

app.post("/create/todo", (req, res)=>{
  const todo = {
    id : id++,
    title : req.body.title,
    description: req.body.description
  }

  todos.push(todo);
  res.json(todos);
})

app.get("/todos", (req, res)=>{
  res.json(todos);
})

app.get("/todo", (req, res)=>{
  const todoId = Number(req.query.id);

  const todo = todos.find((todo) => todo.id === todoId);

  if(!todo){
    return res.status(404).json("ID not found");
  }

  res.json(todo);
  
})

app.delete("/todo", (req, res)=>{
  const todoId = Number(req.query.id);

  const todo = todos.findIndex((todo) => todo.id === todoId);

  if(todo === -1){
    return res.status(404).json("ID not found");
  }

  todos.splice(todo, 1);
  res.json(todos);
})

app.listen(3001, ()=>{console.log("App running on port 3001")});