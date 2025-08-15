const mongoose = require('mongoose');
const OTP = require('../constants/otpModal');
const Schema = mongoose.Schema;
const otpSchema = new Schema(
  {
    [OTP.EMAIL]: {
      type: String,
      required: true,
    },
    [OTP.OTP]: {
      type: String,
    },
    [OTP.CREATED_AT]: {
      type: Date,
      default: Date.now,
      index: { expires: 300 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('otp', otpSchema, 'otp');
