const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  image: [String],
  variants: [
    {
      weight: Number,
      price: Number,
      districts: [String]
    }
  ],
  category: String,
  description: String,
  rating: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const citySchema = new Schema({
  city: String,
  products: [productSchema],
  name: String,
});

module.exports = mongoose.model("City", citySchema);
