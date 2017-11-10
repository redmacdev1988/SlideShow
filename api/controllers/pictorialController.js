'use strict';


var mongoose = require('mongoose'),
Pictorial = mongoose.model('Pictorial');


// list all pictorials

exports.list_all_pictorials = function(req, res) {
  console.log("--- pictorialController.js - list_all_pictorials ---");

  Pictorial.find({}, function(err, pictorials) {
    if (err)
      res.send(err);

    console.log(JSON.stringify(pictorials, null, 2));
    res.json(pictorials);
  });
};


// create a pictorial
// where the req.body is an object with properties specified
// in model.js

exports.create_a_pictorial = function(req, res) {
  var new_pictorial = new Pictorial(req.body);
  new_pictorial.save(function(err, pictorial) {
    if (err)
      res.send(err);

    console.log("--- pictorialController.js - saved successfully --");
    console.log(JSON.stringify(new_pictorial, null, 2));

    //res.json(pictorial);
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

// update data of a pictorial

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
