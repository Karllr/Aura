var song;
var timer = 0;
var amp;
var font;
var keys = [];
var blocks=[];
var level={
  value:0,
  width:0,
  height:0
}
function keyPressed() {
  keys[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  song = loadSound('Dimension.mp3', ok);
  amp = new p5.Amplitude();
  backgroundd.x = width / 2;
  backgroundd.y = height / 2;
  backgroundd.antiX = width / 2;
  backgroundd.antiY = height / 2;
  font = loadFont('Poppins-Bold.ttf');
  for (var i = 0; i < 20; i++) {
    hu.now.push(random(0, 360));
    hu.goal.push(random(0, 360));
    backgroundd.recTion.height.push(random(50, 200));
    backgroundd.recTion.AntiHeight.push(random(50, 200));
    backgroundd.recTion.x.push(i * width / 10);
    backgroundd.otherHeights.now.push(random(100, 150));
    backgroundd.otherHeights.goal.push(random(100, 150));
  }
  Load(blocks,worldMap[level.value]);
}
function ok() {
  song.play();
}

function draw() {
  frameRate(60);
  colorMode(RGB, 255, 255, 255, 255);
  background(20);
  backgroundd.execute();
  song.setLoop(true);
  Game();
}
