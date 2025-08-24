const mongoose = require('mongoose');
const USER = require('../constants/userModal');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    [USER.GAME.NO_OF_MATCHES]: { type: Number, default: 0 },
    [USER.GAME.NO_OF_WINS]: { type: Number, default: 0 },
    [USER.GAME.POINTS]: { type: Number, default: 0 }
  },
  { _id: false } // prevent creation of _id for nested object
);

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
    },
    [USER.TOKEN]: {
      type: String
    },
    [USER.GAMES]: gameSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema, 'user');
