const express = require('express');
const api = express.Router();
const objBingo = require('../controller/register.js');
const objUser = require('../controller/user.js');
const objLeaderBoard = require('../controller/leaderBoard.js')

// User API
api.post('/login', objUser.login);
api.post('/verifyOTP', objBingo.verifyOtp);
api.post('/register', objBingo.userSignup);
api.get('/getLeaderBoard', objLeaderBoard.getLeaderBoard);

module.exports = api;