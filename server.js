var express    		= require('express'); 		
var app        		= express(); 				
var bodyParser 		= require('body-parser');
var domain 			= require("domain").create();
var google          = require('google');


var BING_ACCOUNT_KEY = "ni0yREhySwwi5aZNHUGRAfq7gk8F3XEylaezjilmfjg";
var BING_COSTUMER_ID = "6f229689-b777-4409-bc0d-5a1e68a689e0";
var BING_CLIENT_SECRET = "N0bc6Sk75t8Nmzal3fR2Hw5Po9UZcdHX0slE0L0zPns=";

var service_op  = "Web?$format=json&Query=";
var bingUri = 'https://api.datamarket.azure.com/Bing/Search/Web?$format=json&Query=';
var auth    = new Buffer([ BING_ACCOUNT_KEY, BING_ACCOUNT_KEY ].join(':')).toString('base64');


var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});


app.use(bodyParser());


app.get('/', function(req, res){

	var html  = 
		"<html><head><title>Trabalho RI</title></head>" +
		"<body><form action='/search' method='post'>" +
        "Busca: " +
        "<input type='text' name='query' placeholder='Busca'/> " +
        "<button type='submit'>Buscar</button>" +
        "</form></body>";
	
	res.send(html);
});



app.post('/search', function(req, res) {
	var bingResult = "";
	var googleResult = "";
	var query = req.body.query;
	request.get(
	{
		url : bingUri,
		qs  : {
			$format : 'json',
			Query   : "'" + query + "'"
		}
	}, function(err, response, body) {
		if (err)
			return res.send(500, err.message);
		if (response.statusCode !== 200)
			return res.send(500, response.body);
		bingResult = JSON.parse(response.body);
		res.send(bingResult.d.results);

	});


	/*google.resultsPerPage = 25;

	query = req.body.query;

	google(query, function(err, next, links){
	  if (err) 
	  	console.error(err);

	res.send(links)
	

	})*/
});


app.listen(8080);