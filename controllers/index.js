// This file is meant to gather the routes to export to the server
// Setting up file requirements
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// Telling the server to use the /api path for the api routes, basically initializing it
router.use('/api', apiRoutes);

// Telling the server to use the / path for the home page, basically initializing it
router.use('/', homeRoutes);

// Defining an error route for any error that can occur, but mainly for resources that dont exist
router.use((req, res) => {
  res.status(404).end();
});

// Exports the module to be used in other files
module.exports = router;