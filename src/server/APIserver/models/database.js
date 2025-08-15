const config = require("../Nodedetails/config")
const mongoose = require("mongoose");
const options = {};

const uri = "mongodb+srv://Admin:Admin@bingocluster.kiihlga.mongodb.net/";
console.log("uri------------->", uri);
mongoose.connect(uri, options);
mongoose.connection.on("open", function (ref) {
  console.log("open connection to mongo server.");
});

mongoose.connection.on("connected", function (ref) {
  console.log("connected to mongo server.");
});

mongoose.connection.on("disconnected", function (ref) {
  console.log("disconnected from mongo server.");
});

mongoose.connection.on("close", function (ref) {
  console.log("close connection to mongo server");
});

mongoose.connection.on("error", function (err) {
  console.log("error connection to mongo server!");
  console.log(err);
});

require('./user')
require('./otp')