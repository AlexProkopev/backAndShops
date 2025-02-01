const mongoose = require("mongoose");

const WalletsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    wallet: { type: String, required: true },
  }
);

const Wallets = mongoose.model("Wallets", WalletsSchema);

module.exports = Wallets;
