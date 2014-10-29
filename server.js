// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    		= require('express'); 		// call express
var app        		= express(); 				// define our app using express
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var session 		= require('express-session');
var async 			= require('async');
var domain 			= require("domain").create();
var YaBoss 			= require('yaboss');

app.locals.title = 'Trabalho Recuperação de Informação';

var YAHOO_CONSUMER_KEY = "dj0yJmk9SThxdXJWVGJQZlBJJmQ9WVdrOWVVbERUVVJMTkc4bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01MQ--";
var YAHOO_CONSUMER_SECRET = "ae5264ca12071cd2210080dd9c4439fcb59b2b35";

var BING_ACCOUNT_KEY = "ni0yREhySwwi5aZNHUGRAfq7gk8F3XEylaezjilmfjg";
var BING_COSTUMER_ID = "6f229689-b777-4409-bc0d-5a1e68a689e0";
var BING_CLIENT_SECRET = "N0bc6Sk75t8Nmzal3fR2Hw5Po9UZcdHX0slE0L0zPns=";

var service_op  = "Web?$format=json&Query=";
var bingUri = 'https://api.datamarket.azure.com/Bing/Search/Web?$format=json&Query=';
var auth    = new Buffer([ BING_ACCOUNT_KEY, BING_ACCOUNT_KEY ].join(':')).toString('base64');

var duckUri = "http://api.duckduckgo.com/?q=";
var duckAttr = "&format=json&pretty=1";

var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});

// var YaBossClient = new YaBoss(YAHOO_CONSUMER_KEY, YAHOO_CONSUMER_SECRET);
// YaBossClient.search('web','yahoo', {count: 10}, function(err,dataFound,response){console.log(dataFound)});
var Bing 			= require('binger');

app.locals.title = 'Trabalho Recuperação de Informação';

var CONSUMER_KEY = "dj0yJmk9SThxdXJWVGJQZlBJJmQ9WVdrOWVVbERUVVJMTkc4bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01MQ--";
var CONSUMER_SECRET = "ae5264ca12071cd2210080dd9c4439fcb59b2b35";

var BING_ACCOUNT_KEY = "ni0yREhySwwi5aZNHUGRAfq7gk8F3XEylaezjilmfjg";
var BING_COSTUMER_ID = "6f229689-b777-4409-bc0d-5a1e68a689e0";

// var YaBossClient = new YaBoss(CONSUMER_KEY, CONSUMER_SECRET);
// YaBossClient.search('web','yahoo', {count: 10}, function(err,dataFound,response){console.log(dataFound)});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// here's how to perform a query:
	app.post('/bing', function(req, res) {
		var query       = req.body.query;
		request.get({
		url : bingUri,
		qs  : {
			$format : 'json',
			Query   : "'" + query + "'", // the single quotes are required!
		}
		}, function(err, response, body) {
			if (err)
				return res.send(500, err.message);
			if (response.statusCode !== 200)
				return res.send(500, response.body);
			var results = JSON.parse(response.body);
			res.send(results.d.results);
		});
	});

	app.post('/duck', function(req, res) {
		var query       = req.body.query;
		var duckSearchQuery = duckUri + query + duckAttr;
		console.log(duckSearchQuery);
		request.get({
		url : duckSearchQuery
		}, function(err, response, body) {
			if (err)
				return res.send(500, err.message);
			if (response.statusCode !== 200)
				return res.send(500, response.body);
			var results = JSON.parse(response.body);
			res.send(results);
		});
	});

var port 				= process.env.PORT || 8080;  // set our port
var server_port 		= process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address 	= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


// START THE SERVER
// =============================================================================
domain.on('error', function(err){
	console.log(err);
});

domain.run(function(){
	app.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", server_port " + port )
	});
});
