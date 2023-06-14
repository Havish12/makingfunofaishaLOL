let nosex = 0;
let nosey = 0;
let song;

function preload() {
  img = loadImage('https://i.postimg.cc/3x3QzSGq/m.png');
  
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log("poseNet is initialized");
  song = loadSound('bullyingaisha.mp3');
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    console.log("nosex= " + results[0].pose.nose.x);
    console.log("nosey= " + results[0].pose.nose.y);

    nosex = results[0].pose.nose.x - 25;
    nosey = results[0].pose.nose.y - 7;
  }
}

function draw() {
  image(video, 0, 0, 300, 300);
  image(img, nosex, nosey, 50, 50);
}

function take_snapshot() {
  saveCanvas(canvas, 'yourimage', 'png');
  song.play();
  song.setVolume(1);
  song.rate(1);
}