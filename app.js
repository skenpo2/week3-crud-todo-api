require("dotenv").config()

const express = require('express');
const app = express();
const cors = require("cors")

app.use(express.json()); // Parse JSON bodies
app.use(cors())

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// POST New – Create
//task two -- add task field validator
app.post('/todos', (req, res) => {
  const task = req.body.task;
  if (!task || task === null) 
    return res.status(404).json({message: "the task field is empty"}) 
  //working
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});

// PATCH Update – Partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
});

app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
});

//bonus task
//GET active todos
app.get('/todos/active', (req, res) => {
  const active = todos.filter((t) => !t.completed);
  res.json(active); // working
});

//task one
//GET a single todo - read
app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo || todo === null) return res.status(404).json({ message: 'Todo not found' });
  
  res.status(200).json(todo);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
