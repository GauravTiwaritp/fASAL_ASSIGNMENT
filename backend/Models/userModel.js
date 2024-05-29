const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    undefined: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
    required: false,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
    required: false,
  },
});
module.exports = mongoose.model("User", userSchema);
