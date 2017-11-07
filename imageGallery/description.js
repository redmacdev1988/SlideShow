"use strict";

var START_POINT = -200;
var END_POINT = 350;
var SPEED = 20;

var gPos = START_POINT; // start from 0 with every click of button
var visible = false;

function toggleImageDescription(timeline, descriptionArray, descriptionElementID) {
    console.log("descriptionArray is: ");
    console.log(descriptionArray);

    var toMatch = timeline.currentFrame().data;
    var matched;
    console.log("PERFORMANCE HIT  !");
    for (var i = 0; i < descriptionArray.length; i++) {
      var fileName = descriptionArray[i].fileName;
      if(toMatch.indexOf(fileName) !== -1) { // if fileName exist in toMatch
          console.log("FOUND!!!!!");
          matched = descriptionArray[i].description;
          break;
      }
    }

    var elem = document.getElementById(descriptionElementID);
    elem.innerHTML = matched;
    elem.style.top = START_POINT+"px";
    var id = setInterval(animateDescriptionFunc, 5); // calls frame function every 5 millisecond

    function animateDescriptionFunc() {
      if (visible === false) {
        if (gPos >= END_POINT) {
          clearInterval(id);
          visible = true;
        }
        else {
          gPos += SPEED;
          elem.style.top = gPos + 'px';
        }
      } else {
        if (gPos > START_POINT) {
          gPos -= SPEED;
          elem.style.top = gPos + 'px';
        } else {
          clearInterval(id);
          visible = false;
        }
      }
    }

}
