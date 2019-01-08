const express = require('express');
const cards = require('../routes/cards');
const play = require('../routes/play');
const profiles = require('../routes/profiles');

/*
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');
*/

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/cards', cards);
    app.use('/api/play', play);
    app.use('/api/profiles', profiles);
    /*
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);
    app.use(error);
    */
}