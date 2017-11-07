"use strict";

var LOADER_ID = "loader";
var BODY_CLASS = "body";

function is_cached(src) {
    var image = new Image();
    image.src = src;
    return image.complete;
}


function loadImage(timeline) {
  var img = new Image(), url = timeline.currentFrame().data;
  img.src = url;
  console.log("loadImage - image source--");
  console.log(img.src);

  img.onload = function() {
      var body = document.getElementsByTagName(BODY_CLASS)[0];
      body.style.backgroundImage = "url(" + url + ")";

      setTimeout( // remove loader
      function() {
          var loader = document.getElementById(LOADER_ID);
          if(loader)
            body.removeChild(loader);
        }, 200);
      };
}

function navigate(direction, timeline) {
  if (direction > 0) timeline.nextFrame();
  else if (direction < 0) timeline.previousFrame();
  else timeline.setCurrentToFirstFrame();

  if (!is_cached(timeline.currentFrame().data)) {
    // put in loader
    var loader = document.createElement("div");
    loader.id = LOADER_ID;
    document.getElementsByTagName(BODY_CLASS)[0].appendChild(loader);
  }
  loadImage(timeline);
}


function beforeDOMisLoaded (downloadLocations, timeline, descriptionArray) {

  fetch("http://128.199.83.231/pictorials")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {

      descriptionArray.length = 0;
      for(var index = 0; index < data.length; index++) {
        descriptionArray[index] = data[index];
      }

      for (var imageIndex = 0; imageIndex < data.length; imageIndex++) {
        var imageFileLocation = "http://128.199.83.231/"+descriptionArray[imageIndex].fileName;
        console.log(imageFileLocation);
        downloadLocations.push(imageFileLocation);
      }

      console.log("------ download locations -----");
      console.log(downloadLocations);

      for (var index = 0; index < downloadLocations.length; index++) {
          console.log("inserting " + downloadLocations[index]);
          timeline.insertTimeFrame(downloadLocations[index]);
      }

      timeline.setCurrentToFirstFrame();

      var carousel = (function(){

        var next = document.querySelector('.next');
        var prev = document.querySelector('.prev');

        next.addEventListener('click', function(ev) {
          console.log('NEXT!!');
          navigate(1, timeline);
        });

        prev.addEventListener('click', function(ev) {
          console.log("PREVIOUS!");
          navigate(-1, timeline);
        });

        navigate(0, timeline); // we default it to the first frame
      })();

    });
}
