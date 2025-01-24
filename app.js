const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();
const cors = require('cors');

app.use("/api", routes);
app.use(
  cors({
    origin: "*", // Укажите URL вашего клиента
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Разрешённые методы
    allowedHeaders: ["Content-Type", "Authorization"], // Разрешённые заголовки
    credentials: true, // Если передаются cookies
  })
);

app.options("*", cors()); // Разрешить все OPTIONS-запросы



app.use("/api", routes);
app.use(cors());
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
  console.log("CORS Middleware triggered for:", req.headers.origin);
  next()
});

module.exports = app;
