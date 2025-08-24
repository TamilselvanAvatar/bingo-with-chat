const validator = require('node-validator');
const common = require('../../../helper/common');
const USER = require('../constants/userModal')
const userDB = require('../mongoSchema/user');
const { STRING_REGEX } = require('../../../helper/util');
const { RESPONSES } = require('../../../helper/generalConstants');

const getUser = async (userInfo) => {
	const response = await userDB.findOne({ '$or': [{ [USER.USER_NAME]: userInfo[USER.USER_NAME] }, { [USER.EMAIL]: { '$in': [userInfo[USER.USER_NAME], userInfo[USER.EMAIL]] } }] });
	if (response) {
		return response.toJSON();
	}
	return response;
}

const login = async (req, res) => {
	try {
		const userInfo = req.body;
		const check = validator
			.isObject()
			.withRequired(USER.USER_NAME, validator.isString({ regex: STRING_REGEX }))
			.withRequired(USER.PASSWORD, validator.isString({ regex: STRING_REGEX }));

		validator.run(check, userInfo, async function (errCount, err) {
			if (errCount > 0) {
				return res.status(400).json(RESPONSES.INVALID_DATA(err));
			}
			const userData = await getUser(userInfo);
			if (!userData) {
				return res.status(400).json(RESPONSES.INVALID_USER());
			}
			const checkPassword = common.decrypt_password(userInfo[USER.PASSWORD], userData[USER.PASSWORD]);
			if (!checkPassword) {
				return res.status(400).json(RESPONSES.INVALID_PASSWORD());
			}
			const JWTtoken = common.createPayload({
				id: userData._id,
				[USER.USER_NAME]: userData[USER.USER_NAME],
				[USER.EMAIL]: userData[USER.EMAIL],
				[USER.PASSWORD]: userData[USER.PASSWORD],
			});
			const SUCESS_RESPONSE = RESPONSES.LOGIN_SUCCESS('Logged in successfully')
			SUCESS_RESPONSE.token = JWTtoken;
			SUCESS_RESPONSE.USER_ID = userData._id;
			return res.status(200).json(SUCESS_RESPONSE);
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
	}
}

module.exports = {
	login: login,
	getUser: getUser,
	checkAvailabilityOfUser: async (userInfo) => {
		const response = await getUser(userInfo);
		return !!response
	}
};