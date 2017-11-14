'use strict';

var multer = require('multer');
var mongoose = require('mongoose'),
Pictorial = mongoose.model('Pictorial');

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

exports.upload_a_pictorial = function(req, res) {
    console.log("--- pictorialController.js - upload_a_pictorial");

    upload(req, res, function(err) {
       if (err) {
          console.log(" ---- error uploading file ---- ");
          console.log(err);
          return res.end("Something went wrong!");
       }
       res.render( 'admin/imagesaved.html', { status: "successfully uploaded",
                                                                      filename: gFileName } );
   });
};

// list all pictorials

exports.list_all_pictorials = function(req, res) {
  console.log("--- pictorialController.js - list_all_pictorials ---");

  Pictorial.find({}, function(err, pictorials) {
    if (err)
      res.send(err);
    res.json(pictorials);
  });
};


// create a pictorial


exports.create_a_pictorial = function(req, res) {
  console.log("--- pictorialController.js - create_a_pictorial ---");
  var new_pictorial = new Pictorial(req.body);
  new_pictorial.save(function(err, pictorial) {
    if (err)
      res.send(err);
    console.log("--- pictorialController.js - saved successfully --");
    console.log(JSON.stringify(new_pictorial, null, 2));
    res.render( 'admin/pictorial-created.html', { status: "successfully uploaded"} );
  });
};


// read data of a pictorial

exports.read_a_pictorial = function(req, res) {
  console.log("--- pictorialController.js - read_a_pictorial ---");

  Pictorial.findById(req.params.pictorialId, function(err, pictorial) {
    if (err)
      res.send(err);
    res.json(pictorial);
  });
};


exports.update_a_pictorial = function(req, res) {
  console.log("--- update_a_pictorial ---");
  console.log(req.body);

  Pictorial.findOneAndUpdate( {name: req.params.pictorialId},
                              { $set: { description: req.body.description } },
                              {new: true},
                              function(err, pictorial) {
                                if (err) {
                                  console.log(err);
                                  res.send(err);
                                }
                                res.send(pictorial);
                              });
};


exports.delete_a_pictorial = function(req, res) {
  console.log("pictorialController.js - delete_a_pictorial");
  console.log(req.body.pictorialId);

  Pictorial.remove({
    name: req.body.pictorialId
  }, function(err, pictorial) {
    if (err) {
      res.end(err);
    }
    res.send({removed: req.body.pictorialId});
  });
};
