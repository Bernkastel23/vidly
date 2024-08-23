const mongoose = require('mongoose');
const express = require("express");
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const movies = require('./routes/movies');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.log('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

