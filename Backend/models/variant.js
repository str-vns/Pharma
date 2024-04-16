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
  inventory: [
    {
    batchNum: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
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
      ExpiredAt: {
        type: Boolean,
        default: false,
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

variantSchema.statics.softDelete = async function (id) {
    return await this.updateOne({ _id: id }, { deletedAt: true });
  };
  
variantSchema.statics.restore = async function (id) {
    return await this.updateOne({ _id: id }, {deletedAt: false})
  }
  
module.exports = mongoose.model(RESOURCE.VARIANT, variantSchema);
