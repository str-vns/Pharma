const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const tagsSchema = new mongoose.Schema({
  tagsName: {
    type: String,
    required: [true, "Please enter your Tags name"],
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

tagsSchema.statics.softDelete = async function (id) {
  return await this.updateOne({ _id: id }, { deletedAt: true });
};

tagsSchema.statics.restore = async function (id) {
    return await this.updateOne({ _id: id }, {deletedAt: false})
}

module.exports = mongoose.model(RESOURCE.TAGS, tagsSchema);