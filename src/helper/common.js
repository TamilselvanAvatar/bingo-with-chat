/*
const Mongoose = require("mongoose")
const userDB = require("../server/APIserver/mongoSchema/user");

export const verifyToken = async (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	console.log("bearerHeader----------->", bearerHeader);
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		jwt.verify(bearerToken, authKey, (err, decode) => {
			console.log("decode----------->", decode);
			if (err || !decode) {
				return res.status(401).send({ status: 401, msg: "Token exipired" });
			} else if (decode) {
				userDB.findOne({ _id: Mongoose.mongo.ObjectId(decode.secret.id) }, (err, matched) => {
					if (err || !matched) {
						return res.status(401).send({ status: 401, msg: "Token exipired" });
					} else if (Object.keys(matched).length == 0) {
						return res.status(401).send({ status: 401, msg: "Token exipired" });
					}
					req.userDetail = matched;
					next();
				})
			}
		})
	} else {
		return res.status(401).send({ status: 401, msg: "Token exipired" });
	}
};
*/

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALTS);
const authKey = process.env.AUTH_KEY;

const salt = bcrypt.genSaltSync(saltRounds);

export const encrypt_password = (password) => {
	return bcrypt.hashSync(password, salt);
};

export const decrypt_password = (check_password, password) => {
	return bcrypt.compareSync(check_password, password);
};

export const createPayload = (key) => {
	const payload = { secret: key };
	const token = jwt.sign(payload, authKey, { expiresIn: 180 * 60 });
	return token;
};

export const nested = (...arr) => {
	if (Array.isArray(arr)) {
		return arr.join('.');
	}
	return '';
}

export const check_regex = (userName, callback) => {
	try {
		if (userName.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			callback({ username: userName.toLowerCase() })
		}
		else {
			callback(false)
		}
	}
	catch (e) {
		callback(false)
	}
}