const routes = require('express').Router();
const endpoints = require('./endpoints');

routes.use('/api/v1', endpoints);

module.exports = routes;