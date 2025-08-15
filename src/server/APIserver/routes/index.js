const express = require("express");
const api = express.Router();
const objBingo = require('../controller/register.js');
const objUser = require('../controller/user.js');

// User API
api.post("/login", objUser.login);
api.post("/verifyOTP", objBingo.verifyOtp);
api.post('/register', objBingo.userSignup);

module.exports = api;