const express = require('express');
const app = express();

require('./startup/database')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port);
    module.exports = server;
}


