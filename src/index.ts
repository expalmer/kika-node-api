import "dotenv/config";

import {
  createTask,
  getTask,
  getTasks,
  removeTask,
  updateTask,
} from "./client/supabase";
import express, { Express, Request, Response } from "express";

import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getTask(+id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    const newTask = await createTask(task);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;

    await updateTask(+id, { task, done });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await removeTask(+id);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
