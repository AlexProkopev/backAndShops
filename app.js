const express = require("express");
const routes = require("./routes");
const app = express();

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
