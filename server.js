var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");

/**
 * Set default template engine "handlebars".
 */
app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/**
 * Host static files
 */
 app.use('/static',express.static(__dirname + '/public'));

/**
 * Minsweeper single route.
 */
app.get('/home', function(req, res) {
	res.render('home');
});

app.get('/minesweepers', function(req, res) {
	res.render('minesweepers');
});
app.listen(3000);