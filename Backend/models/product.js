const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter your name"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: RESOURCE.BRAND,
  },
  category: [
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: RESOURCE.CATEGORY,
    }
  ],
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: RESOURCE.TAGS,
    }
  ],
  image: [
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
  ],
  variants: [{
     form: {
        type: String,
        required: true
      },
      strength: {
        type: String,
        required: true
      },
      dosage: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      inventory: [{
        location: {
          type: String,
          required: true
        },
        stock: {
          type: Number,
          required: true
        },
        batchNumber: {
          type: String,
          required: true
        },
        manufactured:
        {
          type: Date,
          required: true
        },
        expiration: {
          type: Date,
          required: true
        }
      }],
  }],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviewed: {
    type: Number,
    default: 0,
  },
  reviews:[
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
     ref: RESOURCE.USER, 
    },
    rating: { 
        type: Number, required: true
     },
    comment: { 
        type: String, required: true
     },
     image: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
        originalname: {
          type: String,
          required: false,
        },
      },
    ],
    createdAt: { 
        type: Date, default: Date.now
     }
    }
  ],
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

productSchema.statics.softDelete = async function (id) {
  return await this.updateOne({ _id: id }, { deletedAt: true });
};

productSchema.statics.restore = async function (id) {
    return await this.updateOne({ _id: id }, {deletedAt: false})
}

module.exports = mongoose.model(RESOURCE.PRODUCT, productSchema);