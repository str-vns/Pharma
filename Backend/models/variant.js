const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const variantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: RESOURCE.PRODUCT,
  },
  form: {
    type: String,
    required: true,
  },
  strength: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  inventory: [
    {
      location: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      batchNumber: {
        type: String,
        required: true,
      },
      manufactured: {
        type: Date,
        required: true,
      },
      expiration: {
        type: Date,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(RESOURCE.VARIANT, variantSchema);
