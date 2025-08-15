var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } }
  },
  { timestamps: true }
);

module.exports = mongoose.model("otp", otpSchema, "otp");
