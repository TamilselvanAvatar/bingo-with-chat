const express = require('express');
const api = express.Router();
const objBingo = require('../controller/register.js');
const objUser = require('../controller/user.js');
const objLeaderBoard = require('../controller/leaderBoard.js')
const objUpdateUsersPoints = require('../controller/updateUsersPoints.js')

// User API
api.post('/login', objUser.login);
api.post('/verifyOTP', objBingo.verifyOtp);
api.post('/register', objBingo.userSignup);
api.get('/getLeaderBoard', objLeaderBoard.getLeaderBoard);
api.get('/updateUsersPoints', objUpdateUsersPoints.updateUsersPoints);

module.exports = api;