var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var pool = new pg.Pool({
	//Get Marcells stuff
});


















var port = process.env.PORT || 3030;
app.listen(port, function() {
	console.log('Server is running on ' + port);
});