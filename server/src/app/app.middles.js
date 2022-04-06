'use strict';

const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/image', express.static('../upload'));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
};