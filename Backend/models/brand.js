const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const brandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Please enter your name"],
  },
  variant: {
    type: String,
    enum: ["Local", "International"],
    default: "Local",
  },
  image: 
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      originalname: {
        type: String,
        required: true,
      },
    },
  createdAt:
  {
    type: Date,
    default: Date.now,
  },
  deletedAt:
  {
    type: Boolean,
    default: false,
  },
  resetTokenUsed: {
    type: Boolean,
    default: false,
  },
});

brandSchema.statics.softDelete = async function (id) {
  return await this.updateOne({ _id: id }, { deletedAt: true });
};

brandSchema.statics.restore = async function (id) {
    return await this.updateOne({ _id: id }, {deletedAt: false})
}

module.exports = mongoose.model(RESOURCE.USER, userSchema);
