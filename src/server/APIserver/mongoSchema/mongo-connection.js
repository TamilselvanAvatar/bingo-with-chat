const { logInfo } = require('../../../helper/util');
const mongoose = require('mongoose');
const options = {};

const uri = process.env.MONGO_DB_PATH;
logInfo(`MONGO CONNECTION STARTED ${uri} ...`)
mongoose.connect(uri, options);

mongoose.connection.on('open', function () {
  logInfo('✅ OPEN CONNECTION TO MONGO SERVER.');
});

mongoose.connection.on('connected', function () {
  logInfo('🔌 CONNECTED TO MONGO SERVER.');
});

mongoose.connection.on('disconnected', function () {
  logInfo('⚠️ DISCONNECTED FROM MONGO SERVER.');
});

mongoose.connection.on('close', function () {
  logInfo('🔒 CLOSED CONNECTION TO MONGO SERVER.');
});

mongoose.connection.on('error', function (err) {
  logInfo('❌ ERROR CONNECTING TO MONGO SERVER!');
  console.error(err);
});

require('./user')
require('./otp')