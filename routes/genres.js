const express = require('express');
const router = express.Router();

const genres = [
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
]

function validateGenre(genre){
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(genre, schema);
}

router.get('/', (req, res)=> {
	res.send(genres);
});

router.get('/:id', (req, res)=>{
	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

//CREATE
router.post('/', (req, res) => {
	
	const {error} = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);
	res.send(genre);
});

//UPDATE
router.put('/:id', (req, res) => {

	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	const {error} = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;
	res.send(genre);
});

//DELETE
router.delete('/:id', (req, res) => {

	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
})

module.exports = router;