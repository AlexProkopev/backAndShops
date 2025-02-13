const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  weight: { type: Number, required: true },
  district: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  wallet: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  lastExtendAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
