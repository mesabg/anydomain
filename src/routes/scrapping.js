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
 * GET :: Basic CORS available
 */
router.get('/', async (request, response, next) => {
    let url = request.query.url;

    //-- Check if url is not properly setup
    if (url === null || url === undefined)
        return response.status(200).send('Nothing to query');
    
    console.log("Accesing URL :: ", url);
    
    //-- Request
    try {
        let web = await axios.request({
            url: url,
            method: 'get',
        });
        return response.status(200).send(web.data);
    } catch (reason) {
        console.log(`An error ocurred while visiting ${url}`);
        console.log("Details :: ", reason);
        return response.status(400).send("Not available to visit");
    }
});



/**
 * POST :: Advanced CORS with styles and scripts linked
 */
router.post('/', async (request, response, next) => {
    let url = request.body.url;
    let script = request.body.script === null || request.body.script === undefined ? '' : request.body.script;
    let style = request.body.style === null || request.body.style === undefined ? '' : request.body.style;

    //-- Check if url is not properly setup
    if (url === null || url === undefined)
        return response.status(200).send('Nothing to query');
    
    //-- Request
    try {
        let web = await axios.request({
            url: url,
            method: 'get',
        });
        web.replace(`</head>`, `<style>${style}</style></head>`);
        web.replace(`</body>`, `<script>${script}</script></body>`);
        return response.status(200).send(web.data);
    } catch (reason) {
        console.log(`An error ocurred while visiting ${url}`);
        console.log("Details :: ", reason);
        return response.status(400).send('Not available to visit');
    }
});


module.exports = router;