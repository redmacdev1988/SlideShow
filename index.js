var express = require('express')
var app = express()
var port = process.env.PORT || 8080

var multer = require('multer');
var bodyParser = require('body-parser');

var app = express()

// set the view engine to ejs
app.set('view engine', 'ejs');

console.log("index.js -  Connect your database by adding a url to the mongoose instance connection");

var mongoose = require('mongoose')

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
console.log("index.js -  mongoose instance connection url connection");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PictorialDB');

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
var routes = require('./api/routes/pictorialRoutes'); //importing route
routes(app);
console.log("index.js -  routed routes");


var gFileName;

// image storage
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
        console.log("---The file name is---" + file.fieldname);
        console.log("---The original name is---" + file.originalname);

        gFileName = file.originalname;

        callback(null, file.originalname);
     }
 });

 // multier takes the requst object
 var upload = multer({ storage: Storage }).array("imgUploader", 1); //Field name and max count

 console.log("index.js -  file upload ready for POST requests");

 app.post("/api/Upload", function(req, res) {

     upload(req, res, function(err) {
         if (err) {
            console.log(" ---- error uploading file ---- ");
            console.log(err);
             return res.end("Something went wrong!");
         }
         console.log("-- storage file name-- ");
         console.log(gFileName);
         console.log("res object back to html page");
         res.render( 'admin/imagesaved.html', { status: "successfully uploaded",
                                                                        filename: gFileName } );

         //return res.redirect('http://139.59.225.252/admin/imagesaved.html');
     });
 });

app.listen(port);
console.log(' pictorial list RESTful API server   on: ' + port);
