/**
 * Global dependencies
 */
const express = require('express');
const router = express.Router();
const axios = require("axios");

/**
 * Allow CORS
 */
router.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});


/**
 * GET :: Index page
 */
router.get('/', async (request, response, next) => {
    return response.status(200).send('System Working correctly');
});


module.exports = router;