const Mongoose = require("mongoose");
const userDB = Mongoose.model("user");

module.exports = {
    getDashboard: function (req, res) {
        userDB.find({}, (err, getDashboard) => {
            if (err) {
                return res.json({ status: 400, msg: "Something went wrong" });
            }
            return res.json({ status: 200, msg: "Pincode fetched successfully", data: getDashboard });
        })
    },
};