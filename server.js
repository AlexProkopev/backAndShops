require("dotenv").config();
require("./db.js");

const config = require("./config");
const cors = require('cors');
const app = require("./app.js");


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = process.env.PORT || 5050


app.listen(PORT, () => console.log("Server running on port 5050..."));
