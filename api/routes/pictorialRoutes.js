'use strict';

module.exports = function(app) {

  var path = require('path');
  var fs = require('fs');

  var pictorialList = require('../controllers/pictorialController');
  var aboutMessage = "Welcome to SlideShow API 2017 by Ricky Tsao";

///Users/rickytsao/Desktop/RICKYTSAO-web/api/routes/Images
  app.route('/').get(function(req, res){
    //console.log(aboutMessage);
    //res.json(aboutMessage);



    // return list if images here

    //requiring path and fs modules

    console.log(__dirname); ///Users/rickytsao/Desktop/RICKYTSAO-web/api/routes
    //joining path of directory
    var directoryPath = path.join(__dirname, '/../../Images');

    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        var imageNames = [];
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            imageNames.push(file);
        });

        res.send(imageNames);
    });

  })

  app.route('/pictorials')
    .get(pictorialList.list_all_pictorials)
    .post(pictorialList.create_a_pictorial);


  app.route('/pictorials/:pictorialId/description')
    .get(pictorialList.read_a_pictorial)
    .post(pictorialList.update_a_pictorial)
    .delete(pictorialList.delete_a_pictorial);

    // put

};
