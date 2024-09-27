const auth = require('../middleware/auth');
const {Rental} = require('../models/rental');
const express = require('express');
const router = express.Router();
const {validate} = require('../models/rental');

router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	/*if(!req.body.customerId) return res.status(400).send('CustomerID is not provided.');
	if(!req.body.movieId) return res.status(400).send('MovieID is not provided');*/

	const rental = await Rental.findOne({
		'customer._id': req.body.customerId,
		'movie._id': req.body.movieId,
	});
	if (!rental) return res.status(404).send('Rental not found');
	if (rental.dateReturned) return res.status(400).send('Rental is already processed.');
	return res.status(200).send('Rental found');
});

module.exports = router;