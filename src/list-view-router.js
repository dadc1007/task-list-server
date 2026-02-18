const express = require("express");
const tasks = require("./tasks-data");

const listViewRouter = express.Router();

listViewRouter.get("/tasks", (req, res) => {
  res.json(tasks);
});

listViewRouter.get("/tasks/:taskId", (req, res) => {
  const taskId = Number(req.params.taskId);
  const task = tasks.find((currentTask) => currentTask.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
});

listViewRouter.get("/tasks/status/:status", (req, res) => {
  const status = req.params.status;

  if (status !== "complete" && status !== "incomplete") {
    return res.status(400).json({
      message: 'Invalid status. Use "complete" or "incomplete".',
    });
  }

  const isCompleted = status === "complete";
  const filteredTasks = tasks.filter(
    (currentTask) => currentTask.isCompleted === isCompleted,
  );

  return res.json(filteredTasks);
});

module.exports = listViewRouter;
