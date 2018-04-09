'use strict';

module.exports = function(app) {

  var path = require('path');
  var fs = require('fs');

  var pictorialList = require('../controllers/pictorialController');
  var aboutMessage = "Welcome to SlideShow API 2017 by Ricky Tsao";

  app.route('/')
  .get(function(req, res){
    var directoryPath = path.join(__dirname, '/../../Images');
    fs.readdir(directoryPath, function (err, files) {
        if (err) { return console.log('Unable to scan directory: ' + err); }
        var imageNames = [];
        files.forEach(function (file) { imageNames.push(file); });
        res.send(imageNames);
    });
  });

  app.route('/pictorials')
    .get(pictorialList.list_all_pictorials)
    .post(pictorialList.create_a_pictorial);

    // todo change post to put
  app.route('/pictorials/:pictorialId')
    .get(pictorialList.read_a_pictorial)
    .put(pictorialList.update_a_pictorial)
    .delete(pictorialList.delete_a_pictorial);

  app.route("/api/Upload")
    .post(pictorialList.upload_a_pictorial);

};
