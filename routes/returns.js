const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const moment = require('moment');


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
	
	/*if(!req.body.customerId) return res.status(400).send('CustomerID is not provided.');
	if(!req.body.movieId) return res.status(400).send('MovieID is not provided');*/

	const rental = await Rental.findOne({
		'customer._id': req.body.customerId,
		'movie._id': req.body.movieId,
	});
	if (!rental) return res.status(404).send('Rental not found');
	if (rental.dateReturned) return res.status(400).send('Rental is already processed.');

	rental.dateReturned = new Date();
	/*const rentalDays = moment().diff(rental.dateOut, 'days');
	rental.rentalFee = rentalDays*rental.movie.dailyRentalRate;*/
	await rental.save();

	await Movie.updateOne({_id: rental.movie._id}, { $inc: {numberInStock: 1}});

	res.send(rental);
});

function validateReturn(req){
	const schema = {
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required(),
	};

	return Joi.validate(req, schema);
};

module.exports = router;