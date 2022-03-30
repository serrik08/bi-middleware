const routes = require('express').Router();
const endpoints = require('./endpoints');

routes.use('', endpoints);

module.exports = routes;