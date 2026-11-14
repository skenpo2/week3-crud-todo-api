const express = require('express');
const cors = require('cors');
const app = express();
const logRequest = require('./middleware/logger.js'); // Import the logger middleware
const { validateTodo, validatePatchTodo } = require('./middleware/validator.js');
const errorHandler = require('./middleware/errorHandler.js'); // Import the error handler middleware

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(logRequest); // Use the logger middleware for all routes


let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All - Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// GET Active - Bonus - MUST be BEFORE /:id
app.get('/todos/active', (req, res) => {
  const active = todos.filter((t) => !t.completed);
  res.status(200).json(active);
});

// GET Completed - MUST be BEFORE /:id
app.get('/todos/completed', (req, res, next) => {
 try {
   const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
 }
 catch (error) {
  next(error); // Pass error to the error-handling middleware
 }
});

// GET Single - Task 1 - MUST be AFTER /active and /completed
app.get('/todos/:id', (req, res, next) => {
 try {
   const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Invalid ID' });
  res.status(200).json(todo);
 }
 catch (error) {
  next(error); // Pass error to the error-handling middleware
 }
});

// POST New - Create - WITH VALIDATION - Task 2
app.post('/todos', validateTodo, (req, res, next) => {
try {
    const { task } = req.body;

  // Validation: POST requires "task" field
  if (!task || task.trim() === '') {
    return res.status(400).json({ message: 'Task field is required' });
  }

  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
}
catch (error) {
  next(error); // Pass error to the error-handling middleware
}
});

// PATCH Update - Partial
app.patch('/todos/:id', validatePatchTodo, (req, res, next) => {
  try {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., { completed: true }
  res.status(200).json(todo);
  }
  catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
});

// DELETE Remove
app.delete('/todos/:id', (req, res, next) => {
 try {
   const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() - non-destructive
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(204).send()
 } // Silent success
 catch (error) {
  next(error); // Pass error to the error-handling middleware
 }
});

app.use(errorHandler); // Use the error handler middleware

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
