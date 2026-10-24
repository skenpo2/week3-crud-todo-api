const express = require('express');
const app = express();

app.use(express.json());

// Sample data
let todos = [
  {
    id: 1,
    task: 'Learn Node.js',
    completed: false
  },
  {
    id: 2,
    task: 'Build CRUD API',
    completed: false
  }
];

let notes = [];

// GET all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET active todos
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  res.status(200).json(activeTodos);
});

// GET completed todos
app.get('/todos/completed', (req, res) => {
  const completedTodos = todos.filter(todo => todo.completed);
  res.status(200).json(completedTodos);
});

// GET a single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  res.status(200).json(todo);
});

// POST create a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      message: 'Task is required'
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PATCH update a todo
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  Object.assign(todo, req.body);

  res.status(200).json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const initialLength = todos.length;

  todos = todos.filter(todo => todo.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  res.status(204).send();
});

// POST create a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: 'Title and content are required'
    });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    content
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: 'Server error'
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});