require("dotenv").config();
require("./db.js");
const app = require("./app.js");

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log("Server running on port 5050..."));
