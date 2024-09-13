const express = require('express');
const mapsRouter = require('./mapsRouter');
const datasetsRouter = require('./datasetsRouter');
const usersRouter = require('./usersRouter');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/maps', mapsRouter);
  router.use('/datasets', datasetsRouter);
  router.use('/users', usersRouter);
}

module.exports = routerAPI;
