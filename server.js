/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
| Mockup server
|
*/

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/_public'));
 
app.listen(8080, function(){
	console.log('Magic is running on port 8080');
});