//POST AND GET-s
const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res)=> {
	const rental = await Rental.find().sort('-dateOut');
	res.send(rental);
}));

router.get('/:id', asyncMiddleware(async (req, res)=>{
	const rental = await Rental.findById(req.params.id);
	if(!rental) return res.status(404).send(`The rental with the ID: ${req.params.id} was not found.`);
	res.send(rental);
}));

//CREATE
router.post('/', auth, asyncMiddleware(async (req, res) => {
	
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send(`The customer with the ID: ${req.body.customerId} was not found.`);

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send(`The movie with the ID: ${req.body.movieId} was not found.`);

	if (movie.numberInStock === 0) return res.status(400).send('Movie out of stock!');
	
	let rental = new Rental( {
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		},
	});

	try {
		const session = await mongoose.startSession();
		await session.withTransaction(async () => {
		  const result = await rental.save();
		  movie.numberInStock--;
		  movie.save();
		  res.send(result);
		});
  
		session.endSession();
		console.log('Success');
	} 
	catch (error) {
		console.log('Error!', error.message);
	}

	// rental = await rental.save();

	// movie.numberInStock--;
	// movie.save();

	// res.send(rental);
}));

module.exports = router;