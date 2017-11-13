var express = require('express')
var app = express()
var port = process.env.PORT || 8080

var bodyParser = require('body-parser');
var ejs = require('ejs');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

var path = require('path')

console.log("Serving up files in 'views' folder");
app.use(express.static(path.join(__dirname, 'views')));
console.log("Serving up files in 'Images' folder");
app.use(express.static('Images'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// model
Pictorial = require('./api/models/pictorialModel'),
console.log("index.js -  created model loading here");

// mongoose
var mongoose = require('mongoose')
console.log("index.js -  mongoose instance connection url connection");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PictorialDB');

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// routes
var routes = require('./api/routes/pictorialRoutes'); //importing route
routes(app);
console.log("index.js -  routes speicfied");

app.listen(port);
console.log(' pictorial list RESTful API server on: ' + port);
