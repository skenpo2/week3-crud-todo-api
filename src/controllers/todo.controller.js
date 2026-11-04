import * as todoService from "../services/todo.service.js";

// Helper function to validate ID
function getTodoId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({
      message: "Invalid todo ID",
    });

    return null;
  }

  return id;
}

// GET All Todos
export async function getAllTodos(req, res, next) {
  try {
    const todos = await todoService.getAllTodos();

    return res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

// GET Single Todo
export async function getTodoById(req, res, next) {
  try {
    const id = getTodoId(req, res);

    if (id === null) return;

    const todo = await todoService.getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

// CREATE Todo
export async function createTodo(req, res, next) {
  try {
    const { task } = req.body;

    const newTodo = await todoService.createTodo(task);

    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

// UPDATE Todo
export async function updateTodo(req, res, next) {
  try {
    const id = getTodoId(req, res);

    if (id === null) return;

    const updatedTodo = await todoService.updateTodo(
      id,
      req.body
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

// DELETE Todo
export async function deleteTodo(req, res, next) {
  try {
    const id = getTodoId(req, res);

    if (id === null) return;

    const deleted = await todoService.deleteTodo(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// GET Completed Todos
export async function getCompletedTodos(req, res, next) {
  try {
    const completed = await todoService.getCompletedTodos();

    return res.status(200).json(completed);
  } catch (error) {
    next(error);
  }
}

// GET Active Todos
export async function getActiveTodos(req, res, next) {
  try {
    const active = await todoService.getActiveTodos();

    return res.status(200).json(active);
  } catch (error) {
    next(error);
  }
}