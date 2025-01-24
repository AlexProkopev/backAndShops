const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();
const cors = require('cors');

app.use("/api",cors(), routes);
app.use(cors());
app.options("*", cors());


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
  res.header("Access-Control-Allow-Origin","*");
  console.log("CORS Middleware triggered for:", req.headers.origin);
  next()
});

module.exports = app;
