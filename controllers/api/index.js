// This file is meant to gather the routes to export to the server
// Setting up file requirements
const router = require('express').Router();

const userRoute = require('./user-routes.js');
const categoryRoute = require('./category-routes.js');
const itemRoute = require('./item-routes.js');
const historyRoute = require('./history-routes.js');

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/item', itemRoute);
router.use('/history', historyRoute);

// Exports the module to be used in other files
module.exports = router;