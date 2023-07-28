require("dotenv").config();

const {
  createTask,
  getTask,
  getTasks,
  removeTask,
  updateTask,
} = require("./client/database");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await getTask(+id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { task } = req.body;

    const newTask = await createTask(task);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;

    await updateTask(+id, { task, done });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await removeTask(+id);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
