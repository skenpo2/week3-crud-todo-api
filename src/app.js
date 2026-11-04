import express from "express";

import todoRoutes from "./routes/todo.routes.js";

const app = express();

// Parse incoming JSON data
app.use(express.json());

// Register Todo Routes
app.use("/todos", todoRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode ?? err.status ?? 500;

  res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Internal server error"
        : err.message,
  });
});

export default app;