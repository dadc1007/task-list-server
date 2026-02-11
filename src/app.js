const express = require("express");
const app = express();
const PORT = 3000;

app.get("/tasks", (req, res) => {
  const tasks = [
    {
      id: 123456,
      isCompleted: false,
      description: "Walk the dog",
    },
    {
      id: 234567,
      isCompleted: true,
      description: "Buy groceries",
    },
    {
      id: 345678,
      isCompleted: false,
      description: "Finish homework",
    },
  ];

  res.json(tasks);
});

const server = app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

module.exports = server;
