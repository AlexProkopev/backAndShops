

require("dotenv").config();

require("./db.js");
const config = require("./config");
const PORT = process.env.PORT || 5050

const app = require("./app.js");

app.listen(PORT, () => console.log("Server running on port 5050..."));
