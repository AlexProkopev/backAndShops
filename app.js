const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const { cleanExpiredOrders } = require("./services/orderService");


app.use(express.json());
app.use("/api", cors(), routes);
app.use(cors());
app.options("*", cors());
setInterval(() => {
  cleanExpiredOrders();
}, 60 * 1000);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
  res.header("Access-Control-Allow-Origin", "*");
  next();
});



module.exports = app;
