const express = require("express");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(listViewRouter);
app.use(listEditRouter);

const server = app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

module.exports = server;
