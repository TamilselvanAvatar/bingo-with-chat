const validator = require('node-validator');
const common = require('../../../helper/common');
const USER = require('../constants/userModal')
const userDB = require('../mongoSchema/user');
const { RESPONSE, STRING_REGEX } = require('../../../helper/util');
const { ERROR_CODE } = require('../../../helper/generalConstants');
const { SUCCESS_CODE } = require('../../../helper/generalConstants');

module.exports = {
	login: function (req, res) {
		try {
			const userInfo = req.body;
			const check = validator
				.isObject()
				.withRequired(USER.USER_NAME, validator.isString({ regex: STRING_REGEX }))
				.withRequired(USER.PASSWORD, validator.isString({ regex: STRING_REGEX }));

			validator.run(check, userInfo, function (errCount, errs) {
				const ERROR_RESPONSE = RESPONSE(400, 'Invalid Parameters', ERROR_CODE.INVALID_DATA, errs);
				if (errCount > 0) {
					return res.json(ERROR_RESPONSE);
				}
				userDB.findOne({ '$or': [{ [USER.USER_NAME]: userInfo[USER.USER_NAME] }, { [USER.EMAIL]: userInfo[USER.EMAIL] }] }, (err, userData) => {
					const ERROR_RESPONSE = RESPONSE(400, 'Invalid User/Password', '', err)
					if (!userData) {
						ERROR_RESPONSE.code = ERROR_CODE.INVALID_USER_NAME;
						return res.json(ERROR_RESPONSE);
					}
					const checkPassword = common.decrypt_password(userInfo[USER.PASSWORD], userData[USER.PASSWORD]);
					if (!checkPassword) {
						ERROR_RESPONSE.code = ERROR_CODE.INVALID_PASSWORD;
						return res.json(ERROR_RESPONSE);
					}
					const JWTtoken = common.createPayload({
						id: userData._id,
						[USER.USER_NAME]: userData[USER.USER_NAME],
						[USER.EMAIL]: userData[USER.EMAIL],
						[USER.PASSWORD]: userData[USER.PASSWORD],
					});
					const SUCESS_RESPONSE = RESPONSE(200, 'Logged in successfully', SUCCESS_CODE.LOGIN_SUCCESS)
					SUCESS_RESPONSE.token = JWTtoken;
					return res.json(SUCESS_RESPONSE);

				})
			});
		} catch (err) {
			console.error(err);
			const ERROR_RESPONSE = RESPONSE(500, 'Something went wrong', ERROR_CODE.UNKNOWN_ERROR, err)
			return res.json(ERROR_RESPONSE);
		}
	}
};