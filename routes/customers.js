const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=> {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', async (req, res)=>{
	const customer = await Customer.findById(req.params.id);
	if(!customer) return res.status(404).send('The customer with the given ID was not found.');
	res.send(customer);
});

//CREATE
router.post('/', auth, async (req, res) => {
	
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer( {
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone
	});

	await customer.save();

	res.send(customer);
});

//UPDATE
router.put('/:id', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone
	}, 
	{new: true});
	if(!customer) return res.status(404).send('The customer with the given ID was not found.');

	res.send(customer);
});

//DELETE
router.delete('/:id', auth, async (req, res) => {
	const customer = await Customer.findByIdAndDelete({_id: req.params.id});
	if(!customer) return res.status(404).send('The customer with the given ID was not found.');

	res.send(customer);
})

module.exports = router;