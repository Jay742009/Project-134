img = "";
object = [];
status = "";
Song = "";

function preload() {
    Song = loadSound("alarm_classic.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status1").innerHTML = "Status = Baby Detecting";
}

function modelloaded() {
    console.log("cocossd is ready ");
    status = true;
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotresults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < object.length; i++) {
            if (object[i].label == "person"){  
            document.getElementById("status1").innerHTML = "Status = Baby found";
            document.getElementById("span1").innerHTML = object.length;
            Song.stop();
            fill(r, g, b);
            perscent = floor(object[i].confidence * 100);
            text(object[i].label + " " + perscent + "%", object[i].x + 15, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }  else {
            document.getElementById("status1").innerHTML = "Status = Baby not found";
            document.getElementById("span1").innerHTML = object.length;
            Song.play();
            fill(r, g, b);
            perscent = floor(object[i].confidence * 100);
            text(object[i].label + " " + perscent + "%", object[i].x + 15, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
        }
    }

}
