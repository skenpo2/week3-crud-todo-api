import express from "express";

import * as todoControllers from "../controllers/todo.controller.js";

import {
  validateCreateTodo,
  validateUpdateTodo,
} from "../middleware/todoValidation.js";

const router = express.Router();

// GET All Todos
router.get("/", todoControllers.getAllTodos);

// GET Completed Todos
router.get("/completed", todoControllers.getCompletedTodos);

// GET Active Todos
router.get("/active", todoControllers.getActiveTodos);

// GET Single Todo
router.get("/:id", todoControllers.getTodoById);

// CREATE Todo
router.post("/", validateCreateTodo, todoControllers.createTodo);

// UPDATE Todo
router.patch("/:id", validateUpdateTodo, todoControllers.updateTodo);

// DELETE Todo
router.delete("/:id", todoControllers.deleteTodo);

export default router;