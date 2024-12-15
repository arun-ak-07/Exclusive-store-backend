const mongoose = require("mongoose");

const producstSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["men", "women", "kids", "unisex"],
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model("Product", producstSchema);

module.exports = Product;
