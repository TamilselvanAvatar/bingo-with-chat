const express = require("express");
const api = express.Router();
const common = require("../helper/common.js");
var objDashboard = require('../controller/dashboard.js');
var objBingo = require('../controller/register.js');
var objUser = require('../controller/user.js');

// User API
api.post("/login", objUser.login);
api.post("/verifyOTP", objBingo.verifyOtp);
api.post('/register', objBingo.userSignup);

module.exports = api;