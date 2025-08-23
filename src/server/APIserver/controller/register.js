const Mongoose = require('mongoose');
const validator = require('node-validator');
const userDB = Mongoose.model('user');
const otpDB = Mongoose.model('otp');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const USER = require('../constants/userModal');
const objUser = require('../controller/user.js');
const common = require('../../../helper/common');
const { STRING_REGEX } = require('../../../helper/util');
const { RESPONSES } = require('../../../helper/generalConstants');
// const Vonage = require('@vonage/server-sdk');
// const vonage = new Vonage({
// 	apiKey: "7b322514",
// 	apiSecret: "7Lqw4Op6B4RDRRiG"
// })

module.exports = {
	signUp: async function (req, res) {
		try {
			let data = req.body;
			const users = await otpDB.findOne({
				number: req.body.number
			})
			if (users) return res.json({ status: 400, msg: "OTP already sent to the number. Please try again after 5min" })
			const OTP = otpGenerator.generate(6, {
				digits: true, alphabets: false, upperCase: false, specialChars: false
			});
			const from = "MilkMan OTP"
			const to = "919788877388"
			const text = 'Your Milkman otp is ' + OTP + '. ' + ' Kindly use this otp to login';
			console.log('otp ', OTP);
			// vonage.message.sendSms(from, to, text, (err, responseData) => {
			// 	if (err) {
			// 		console.log(err);
			// 	} else {
			// 		if (responseData.messages[0]['status'] === "0") {
			// 			console.log("Message sent successfully.");
			// 		} else {
			// 			console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
			// 		}
			// 	}
			// })
			const number = req.body.number;
			const otp = new otpDB({ number: number, otp: OTP });
			const salt = await bcrypt.genSalt(10);
			data.otp = await bcrypt.hash(OTP, salt);
			var check = validator
				.isObject()
				.withRequired(
					"number",
					validator.isString({ regex: /^(?=.*[\w\d]).+/ })
				)
				.withRequired(
					"otp",
					validator.isString({ regex: /^(?=.*[\w\d]).+/ })
				);
			validator.run(check, data, function (errCount, errs) {
				if (errCount > 0) {
					return res.json({
						status: 400,
						msg: "Invalid parameters",
						error: errs,
					});
				}
				otpDB.create(data, (err, bookingRec) => {
					if (err) {
						if (err.code == 11000) {
							return res.json({ status: 400, msg: "Email already exists" });
						}
						return res.json({ status: 400, msg: "Something went wrong  1" });
					} else if (!bookingRec) {
						return res.json({ status: 400, msg: "Something went wrong 2" });
					}
					return res.json({ status: 200, msg: "OTP Sent successfully" });
				});
			});
		} catch (e) {
			console.log(e);
			return res.json({ status: 500, msg: "Something went wrong", call: e });
		}
	},
	verifyOtp: async function (req, res) {
		try {
			let data = req.body;
			const otp = await otpDB.findOne({
				number: req.body.number
			})
			if (!otp) return res.json({ status: 400, msg: "You entered Expired OTP" });
			const rightOTP = otp.otp;
			const validUser = await bcrypt.compare(data.otp, rightOTP);
			if (otp._doc.number === data.number && validUser) {
				console.log(data);
				//return res.json({ status: 200, msg: "OTP Verified Sucessfully" });
				if (validUser) {
					userDB.find({ status: 0, number: req.body.number }, (err, getUsers) => {
						if (err) {
							return res.json({ status: 400, msg: "Something went wrong" });
						}
						else if (getUsers.length === 0) {
							return res.json({ status: 200, msg: "New User", data: getUsers });
						}
						return res.json({ status: 200, msg: "User data fetched successfully", data: getUsers });
					})
				}
				otpDB.deleteOne(data.number, (err, bookingRec) => {
					if (!bookingRec || err) {
						//return res.json({ status: 400, msg: "Something went wrong" });
					}
					//return res.json({ status: 200, msg: "OTP number deleted" });
				});
			} else {
				res.json({ status: 200, msg: "Incorrect OTP" })
			}
		} catch (e) {
			console.log(e);
			return res.json({ status: 500, msg: "Something went wrong", call: e });
		}
	},
	userSignup: async function (req, res) {
		try {
			const req_data = req.body;
			const check = validator
				.isObject()
				.withRequired(USER.USER_NAME, validator.isString({ regex: STRING_REGEX }))
				.withRequired(USER.EMAIL, validator.isString({ regex: /.*@.{1,}\..{1,}/ }))
				.withRequired(USER.PASSWORD, validator.isString({ regex: STRING_REGEX }));

			validator.run(check, req_data, async function (errCount, errs) {
				if (errCount > 0) {
					return res.status(400).json(RESPONSES.INVALID_DATA(errs));
				}
				try {
					const checkUserExist = await objUser.checkAvailabilityOfUser(req_data);
					if (checkUserExist) {
						return res.status(409).json(RESPONSES.USER_ALREADY_EXIST());
					}
					if (!req_data.isEncrypted) {
						req_data[USER.PASSWORD] = common.encrypt_password(req_data[USER.PASSWORD])
					}
					const response = await userDB.create(req_data);
					const dbData = response.toJSON();
					const SUCCESS_RESPONSE = RESPONSES.GENERAL_SUCCESS('User Inserted Succesfully');
					SUCCESS_RESPONSE.data = dbData;
					return res.status(200).json(SUCCESS_RESPONSE)

				} catch (err) {
					console.error(err);
					return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));

				}
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
		}
	},

};
