'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

require('./app.middles')(app);
app.use('/api', require('./app.router'));

module.exports = app;
