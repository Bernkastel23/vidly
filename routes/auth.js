const bcrypt = require('bcrypt');
const Joi = require("joi");
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res)=> {
// 	const users = await User.find().sort('name');
// 	res.send(users);
// });

// router.get('/:id', async (req, res)=>{
// 	const user = await User.findById(req.params.id);
// 	if(!user) return res.status(404).send(`The user with the ID: ${req.params.id} was not found.`);
// 	res.send(user);
// });

//CREATE
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email});
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const token = user.generateAuthToken();
	res.send(token);
});

function validate(user){
	const schema = {
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(8).max(255).required()
	};

	return Joi.validate(user, schema);
}
module.exports = router;