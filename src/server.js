// Heroku direction :: https://anydomain.herokuapp.com/
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Start Express server
const app = express();
app.set('port', process.env.PORT || 5000);

// Middlewares management
app.use(bodyParser.json());

// Routing
const routes = require('./routes');
app.use('/', routes.main);
app.use('/scrapping', routes.scrapping);

// Where's my app running
app.listen(app.get('port'), () => {
	console.log('Api running on port', app.get('port'))
});