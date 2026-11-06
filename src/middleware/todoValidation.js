// Validate new todo
export function validateCreateTodo(req, res, next) {
  const { task } = req.body || {};

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      message: "A valid task field is required",
    });
  }

  next();
}

// Validate updated todo
export function validateUpdateTodo(req, res, next) {
  const updates = req.body;

  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates)
  ) {
    return res.status(400).json({
      message: "A valid update object is required",
    });
  }

  const allowedFields = ["task", "completed"];
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return res.status(400).json({
      message: "Provide at least one field to update",
    });
  }

  const hasInvalidField = fields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasInvalidField) {
    return res.status(400).json({
      message: "Only task and completed can be updated",
    });
  }

  if (
    updates.task !== undefined &&
    (typeof updates.task !== "string" || !updates.task.trim())
  ) {
    return res.status(400).json({
      message: "Task must be a non-empty string",
    });
  }

  if (
    updates.completed !== undefined &&
    typeof updates.completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "Completed must be a boolean",
    });
  }

  next();
}