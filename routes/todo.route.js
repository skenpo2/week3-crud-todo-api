import express from "express";

import { getAllTodosController } from "../controller/todo.controller.js";
import { createNewTodoController } from "../controller/todo.controller.js";
import { updateTodoController } from "../controller/todo.controller.js";
import { deleteTodoController } from "../controller/todo.controller.js";
import { getCompletedTodosController } from "../controller/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodosController);
router.post("/", createNewTodoController);
router.patch("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);
router.get("/completed", getCompletedTodosController);

export default router;
