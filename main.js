var canvas = " ";
var img =  " ";
var s1 = " ";
var object_detect = " ";
var object = [];
var video = " ";

function preload() {
   
     
}

function setup() {
     canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

     object_detect = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status - Detecting";
}

function modelLoaded() {
     console.log("model is loaded");
     s1 = true;
     object_detect.detect(video, gotResults)
}

function gotResults(error, results) {
     if (error) {
          console.error(error);
     } else {
          console.log(results);
          object = results;
     }
}

function draw() {
     image(video, 0, 0, 380, 380);

     if(s1 != " "){
          for (let i = 0; i < object.length; i++) {
               document.getElementById("status").innerHTML = "Detected";
               document.getElementById("people").innerHTML = "People Detected: " + object.length;
               var percent = floor(object[i].confidence * 100);
               fill("#000");
               text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
               noFill();
               stroke("#000");
               rect(object[i].x, object[i].y, object[i].width , object[i].height);
          }
     }

}