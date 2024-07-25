/*

1.service managing the list of genres (http://vidly.com/api/genres) 
{action-animation-comedy-crime-drama-experimental-fantasy-historical-horror-romance-science fiction-thriller-western-musical-war}

2.get-create-update-delete
app.get()
app.post()
app.put()
app.delete()

*/

const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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

//GET
app.get('/', (req, res) => {
	res.send('Hello Hello');
});

app.get('/api/genres', (req, res)=> {
	res.send(genres);
});

app.get('/api/genres/:id', (req, res)=>{
	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

//CREATE
app.post('/api/genres', (req, res) => {
	
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
app.put('/api/genres/:id', (req, res) => {

	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	const {error} = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;
	res.send(genre);
});

//DELETE
app.delete('/api/genres/:id', (req, res) => {

	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre with the given ID was not found.');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

