const Joi = require("joi");
const { unique } = require("joi/lib/types/array");
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024
	}
}));

function validateUser(user){
	const schema = {
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(8).max(255).required()
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;