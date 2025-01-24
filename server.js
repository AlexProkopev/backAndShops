require("dotenv").config();
require("./db.js");

const config = require("./config");
const app = require("./app.js");






const PORT = process.env.PORT || 5050


app.listen(PORT, () => console.log("Server running on port 5050..."));
