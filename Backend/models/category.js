const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please enter your category name"],
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
});

categorySchema.statics.softDelete = async function (id) {
  return await this.updateOne({ _id: id }, { deletedAt: true });
};

categorySchema.statics.restore = async function (id) {
    return await this.updateOne({ _id: id }, {deletedAt: false})
}

module.exports = mongoose.model(RESOURCE.CATEGORY, categorySchema);