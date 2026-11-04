let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build CRUD API", completed: false },
];

let nextId = 3;

// GET All Todos
export function getAllTodos() {
  return todos;
}

// GET Single Todo
export function getTodoById(id) {
  return todos.find((todo) => todo.id === id) || null;
}

// CREATE Todo
export function createTodo(task) {
  const newTodo = {
    id: nextId++,
    task: task.trim(),
    completed: false,
  };

  todos.push(newTodo);

  return newTodo;
}

// UPDATE Todo
export function updateTodo(id, updates) {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return null;
  }

  if (updates.task !== undefined) {
    todo.task = updates.task.trim();
  }

  if (updates.completed !== undefined) {
    todo.completed = updates.completed;
  }

  return todo;
}

// DELETE Todo
export function deleteTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return false;
  }

  todos.splice(todoIndex, 1);

  return true;
}

// GET Completed Todos
export function getCompletedTodos() {
  return todos.filter((todo) => todo.completed);
}

// GET Active Todos
export function getActiveTodos() {
  return todos.filter((todo) => !todo.completed);
}