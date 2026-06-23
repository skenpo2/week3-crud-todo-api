import express from "express";
import todos from "../data/todo.js";

export const getAllTodosController = (req, res) => {
  res.status(200).json(todos); // Send array as JSON
};

export const createNewTodoController = (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
};

export const updateTodoController = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
};

export const deleteTodoController = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: "Not found" });
  res.status(204).send(); // Silent success
};

export const getCompletedTodosController = (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
};
