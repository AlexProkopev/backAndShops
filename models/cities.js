const mongoose = require("mongoose");
const { Schema } = mongoose;
const { productSchema } = require("../models/product");

const citySchema = new Schema({
  city: String,
  products: [productSchema],
  name: String,
  img: String,
});

module.exports = mongoose.model("City", citySchema);
