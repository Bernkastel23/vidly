const express = require('express');
const genres = require('../routes/genres');
const home = require('../routes/home');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const auth = require('../routes/auth');
const users = require('../routes/users');
const error = require('../middleware/error');
const returns = require('../routes/returns');

module.exports = function(app) {
	app.use(express.json());
	app.use('/api/genres', genres);
	app.use('/', home);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/returns', returns);
	app.use(error);
}