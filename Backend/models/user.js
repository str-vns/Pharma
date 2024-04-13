const mongoose = require("mongoose");
const validator = require("validator");
const { RESOURCE } = require("../constants/index");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  phone: {
      type: String,
      required: [true, "Please Enter Your Phone Number"],
      minlength: [11, "Phone Number must be 11 digits"],
  },
  age: {
    type: Number,
    required: [true, "Please Enter Your Age"],
    validate: {
        validator: function(value) {
          return value >= 18 && value <= 100;
        },
        message: 'Age must be between 18 and 100'
      }
  },
  roles:
    {
      type: String,
      enum: ["Admin", "Employee", "Customer"],
      default: "Customer",
    },
//   image: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//       originalname: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
  seniorAt:{
         type: Boolean,
         default: false,
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

userSchema.statics.softDelete = async function (id) {
    return await this.findbyIdAndUpdate(id, {deletedAt: true})
}

userSchema.statics.restore = async function (id) {
    return await this.findbyIdAndUpdate(id, {deletedAt: false})
}

module.exports = mongoose.model(RESOURCE.USER, userSchema);
