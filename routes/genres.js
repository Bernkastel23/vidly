const {Genre, validate} = require("../models/genre");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/*const genres = [
	{id: 1, name:'action'},
	{id: 2, name:'animation'},
	{id: 3, name:'comedy'},
	{id: 4, name:'crime'},
	{id: 5, name:'drama'},
	{id: 6, name:'experimental'},
	{id: 7, name:'fantasy'},
	{id: 8, name:'historical'},
	{id: 9, name:'horror'},
	{id: 10, name:'romance'},
	{id: 11, name:'science fiction'},
	{id: 12, name:'thriller'},
	{id: 13, name:'western'},
	{id: 14, name:'musical'},
	{id: 15, name:'war'},
]*/

router.get('/', async (req, res)=> {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, res)=>{
	const genre = await Genre.findById(req.params.id);
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

//CREATE
router.post('/', async (req, res) => {
	
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre( {name: req.body.name} )

	await genre.save();

	res.send(genre);
});

//UPDATE
router.put('/:id', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

//DELETE
router.delete('/:id', async (req, res) => {
	const genre = await Genre.findByIdAndDelete({_id: req.params.id});
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
})

module.exports = router;