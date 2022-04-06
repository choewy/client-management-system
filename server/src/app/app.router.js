'use strict';

const { Router } = require("express");
const appController = require("./app.controller");

const router = Router();

Object.values(appController).forEach((controller) => {
    const { method, url, middleware, callback } = controller;
    middleware
        ? router[method](url, middleware, callback)
        : router[method](url, callback);
});

module.exports = router;