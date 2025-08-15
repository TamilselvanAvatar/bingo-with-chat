const mongoose = require('mongoose');
const USER = require('../constants/userModal');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    [USER.USER_NAME]: {
      type: String,
      required: true,
    },
    [USER.EMAIL]: {
      type: String,
      lowercase: true,
      match: /.+@.+\..+/,
    },
    [USER.PASSWORD]: {
      type: String,
      required: true,
    },
    [USER.STATUS]: {
      type: Number,
      default: 0,
      enum: [0, 1],
      index: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema, 'user');
