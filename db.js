const mongoose = require("mongoose");
const { DB_URI } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected to mongoose..."))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
