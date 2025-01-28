const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: [{ type: String }],
  variants: [
    {
      weight: { type: Number, required: true, min: 0 },
      price: { type: Number, required: true, min: 0 },
      districts: [{ type: String }],
    },
  ],
  category: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

// Экспортируем и схему, и модель
module.exports = { productSchema, Product };
