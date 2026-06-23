import express from "express";

import todos from "./data/todo.js";

import todoRoutes from "./routes/todo.route.js";

import errorMiddleWare from "./middleware/error.middleware.js";

const app = express();
app.use(express.json()); // Parse JSON bodies

app.use("/todos", todoRoutes);

app.use(errorMiddleWare);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
