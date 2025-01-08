

require("dotenv").config();

require("./db.js");

const app = require("./app.js");

app.listen(5050, () => console.log("Server running on port 5050..."));
