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
    let script = request.query.script === null || request.query.script === undefined ? '' : request.query.script;
    let style = request.query.style === null || request.query.style === undefined ? '' : request.query.style;

    //-- Check if url is not properly setup
    if (url === null || url === undefined)
        return response.status(200).send('Nothing to query');
    
    console.log("Accesing URL :: ", url);
    console.log("Style is :: ", style);
    console.log("Script is :: ", script);
    
    //-- Request
    try {
        let web = (await axios.request({
            url: url,
            method: 'get',
        })).data;
        web.replace('<head>', '<head> <base href="' + url + '"/>');
        web.replace('</head>', '<style type="text/css"> header { display:none !important; } </style></head>');
        web.replace('</body>', '<script type="text/javascript"> alert("United we are"); </script></body>');
        return response.status(200).send(web);
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

    console.log("script is :: ", script);
    console.log("style is :: ", style);

    //-- Check if url is not properly setup
    if (url === null || url === undefined)
        return response.status(200).send('Nothing to query');
    
    //-- Request
    try {
        let web = (await axios.request({
            url: url,
            method: 'get',
        })).data;
        web.replace(`</head>`, `<style>${style}</style></head>`);
        web.replace(`</body>`, `<script>${script}</script></body>`);
        return response.status(200).send(web);
    } catch (reason) {
        console.log(`An error ocurred while visiting ${url}`);
        console.log("Details :: ", reason);
        return response.status(400).send('Not available to visit');
    }
});


module.exports = router;