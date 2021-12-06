const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    requiired: [true, "Please enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  brand: {
    type: String,
    required: [true, "Please enter Product Brand"],
  },
  counter: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
