var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      enum: [0, 1],
      index: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema, "user");
