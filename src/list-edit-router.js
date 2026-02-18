const express = require("express");
const tasks = require("./tasks-data");

const listEditRouter = express.Router();

function validateDescription(description, { required = false } = {}) {
  if (required && description === undefined) {
    return 'The field "description" is required.';
  }

  if (description !== undefined && typeof description !== "string") {
    return 'The field "description" must be a string.';
  }

  return null;
}

function validateIsCompleted(isCompleted, { required = false } = {}) {
  if (required && isCompleted === undefined) {
    return 'The field "isCompleted" is required.';
  }

  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return 'The field "isCompleted" must be a boolean.';
  }

  return null;
}

listEditRouter.post("/tasks", (req, res) => {
  const { description, isCompleted } = req.body;

  const descriptionError = validateDescription(description, { required: true });
  if (descriptionError) {
    return res.status(400).json({ message: descriptionError });
  }

  const isCompletedError = validateIsCompleted(isCompleted, { required: true });
  if (isCompletedError) {
    return res.status(400).json({ message: isCompletedError });
  }

  const newTask = {
    id: Date.now(),
    description,
    isCompleted,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

listEditRouter.delete("/tasks/:taskId", (req, res) => {
  const taskId = Number(req.params.taskId);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  return res.json(deletedTask);
});

listEditRouter.put("/tasks/:taskId", (req, res) => {
  const taskId = Number(req.params.taskId);
  const task = tasks.find((currentTask) => currentTask.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { description, isCompleted } = req.body;

  const descriptionError = validateDescription(description);
  if (descriptionError) {
    return res.status(400).json({ message: descriptionError });
  }

  const isCompletedError = validateIsCompleted(isCompleted);
  if (isCompletedError) {
    return res.status(400).json({ message: isCompletedError });
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (isCompleted !== undefined) {
    task.isCompleted = isCompleted;
  }

  return res.json(task);
});

module.exports = listEditRouter;
