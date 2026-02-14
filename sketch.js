let love = 0;
let maxLove = 200;
let gameState = "start";
let emojis = [];
let spriteImg;
let playlistLink =
  "https://open.spotify.com/playlist/3MfhY3kf9sbrrrXZIFB2VK?si=1255ef4056184e05&pt=13b5676f65a1853c3433aa79debef19e";
let introStartTime = 0;
let showYes = false;
let song;

function preload() {
  spriteImg = loadImage("anji.png");
  song = loadSound("touch.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  introStartTime = millis();
  pixelDensity(1);
  noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
    return;
  }

  if (gameState === "intro") {
    drawIntro();
    return;
  }

  drawBackgroundShift();
  drawHeartAura();
  drawSprite();
  drawIdleSparkles();

  if (gameState === "playing") {
    drawChoices();
    drawGuideBubble();
  }

  if (gameState === "ending") {
    drawEnding();
  }

  updateEmojis();

  if (love > 70) {
    fill(255, 100, 150, 20);
    rect(0, 0, 800, 1920);
  }
}
function drawStartScreen() {
  // pastel pink base
  background(255, 210, 230);

  // heart pattern
  textSize(20);
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      fill(255, 150, 180, 120);
      text("❤", x, y);
    }
  }

  drawStartButton();
}

function drawStartButton() {
  let bounce = sin(frameCount * 0.07) * 6;

  push();
  rectMode(CENTER);

  fill(255, 240, 250);
  stroke(255, 130, 170);
  strokeWeight(4);

  rect(width / 2, height / 2 + bounce, 220, 80, 50);

  noStroke();
  fill(0);
  textFont("Game Boy");
  textSize(28);
  text("START 💖", width / 2, height / 2 + bounce);

  pop();
}

function drawIntro() {
  background(255, 210, 230);
  textSize(20);
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      fill(255, 150, 180, 120);
      text("❤", x, y);
    }
  }

  let bob = sin(frameCount * 0.05) * 3;

  // Image in center
  image(spriteImg, width / 2, height / 2 - 40 + bob, 260, 320);

  // Text below
  fill(0);
  textSize(22);
  textFont("Game Boy");
  text(
    "Hey babe💞. It's Valentine's Day...\nWanna make me happy?",
    width / 2,
    height / 2 + 180
  );

  if (millis() - introStartTime > 5000) {
    showYes = true;
  }

  if (showYes) {
    drawYesButton();
  }
  let fade = map(millis() - introStartTime, 0, 2000, 255, 0);
  fill(0, fade);
  rect(0, 0, width, height);
}

function drawYesButton() {
  let yOffset = sin(frameCount * 0.08) * 5;

  push();
  rectMode(CENTER);

  fill(255, 220, 235);
  stroke(255, 150, 190);
  strokeWeight(3);

  rect(width / 2, height - 120 + yOffset, 240, 60, 40);

  noStroke();
  fill(60);
  textSize(20);
  text("Yes. I'm a good boy💗", width / 2, height - 120 + yOffset);

  pop();
}

function drawBackgroundShift() {
  let soft = color(230, 220, 255);
  let deep = color(40, 0, 70);
  let bg = lerpColor(soft, deep, love / maxLove);
  background(bg);
}

function drawHeartAura() {
  let beatSpeed = map(love, 0, maxLove, 0.1, 0.7);
  let size = 400 + sin(frameCount * beatSpeed) * 30;

  let softPink = color(255, 180, 210, 120);
  let deepPink = color(200, 0, 80, 180);
  let heartColor = lerpColor(softPink, deepPink, love / maxLove);

  fill(heartColor);
  noStroke();

  push();
  translate(width / 2, height / 2 - 60);
  scale(size / 220);

  beginShape();
  vertex(0, -40);
  bezierVertex(-60, -90, -120, -10, 0, 90);
  bezierVertex(120, -10, 60, -90, 0, -40);
  endShape(CLOSE);

  pop();
}

function drawSprite() {
  let bob = sin(frameCount * 0.05) * 3;
  image(spriteImg, width / 2, height / 2 - 30 + bob, 250, 300);
}

function drawIdleSparkles() {
  let t = frameCount * 0.02;

  for (let i = 0; i < 10; i++) {
    let angle = t + (i * TWO_PI) / 10;
    let radius = 100 + sin(frameCount * 0.03 + i) * 5;

    let sx = width / 2 + cos(angle) * radius;
    let sy = height / 2 - 40 + sin(angle) * radius;

    textSize(20);
    text("✨", sx, sy);
  }
}

function drawChoices() {
  drawChoiceButton(width / 2, 620, "Compliment her 🥴");
  drawChoiceButton(width / 2, 700, "Give her flowers 💐");
  drawChoiceButton(width / 2, 780, "Get freaky 😈");
  drawChoiceButton(width / 2, 860, "Do nothing...");
}

function drawChoiceButton(cx, cy, label) {
  let buttonWidth = 280;
  let buttonHeight = 45;

  rectMode(CORNER);
  fill(255, 245, 250);
  stroke(200, 150, 200);
  strokeWeight(2);
  rect(cx - buttonWidth / 2, cy - buttonHeight / 2, buttonWidth, buttonHeight, 30);

  noStroke();
  fill(60);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, cx, cy);
}

function mousePressed() {
  if (gameState === "playing") {
    // Compliment
    if (inButton(550)) {
      love += 10;
    }

    // Flowers
    else if (inButton(620)) {
      love += 5;
    }

    // Freaky
    else if (inButton(690)) {
      love += 15;
    }

    // Do nothing
    else if (inButton(760)) {
      love -= 10;
    }

    love = constrain(love, 0, maxLove);
    spawnEmojis(mouseX, mouseY);

    if (love >= maxLove) {
      gameState = "ending";
    }
  } else if (gameState === "ending") {
    // Playlist button
    if (
      mouseX > width / 2 - 130 &&
      mouseX < width / 2 + 130 &&
      mouseY > height - 100 - 27 &&
      mouseY < height - 100 + 27
    ) {
      window.open(playlistLink, "_blank");
    }

    // Restart button (top right)
    if (
      mouseX > width - 125 &&
      mouseX < width - 15 &&
      mouseY > 30 &&
      mouseY < 70
    ) {
      restartGame();
    }
  }
  if (gameState === "start") {
    if (
      mouseX > width / 2 - 110 &&
      mouseX < width / 2 + 110 &&
      mouseY > height / 2 - 40 &&
      mouseY < height / 2 + 40
    ) {
      gameState = "intro";
      introStartTime = millis();
      showYes = false;
    }
  }

  if (gameState === "intro" && showYes) {
    if (
      mouseX > width / 2 - 80 &&
      mouseX < width / 2 + 80 &&
      mouseY > height - 150 &&
      mouseY < height - 90
    ) {
      gameState = "playing";
    }
  }
  if (!song.isPlaying()) {
    userStartAudio();
    song.loop();
    song.setVolume(0.4);
  }
}

function inButton(yPos) {
  return (
    mouseX > width / 2 - 140 &&
    mouseX < width / 2 + 140 &&
    mouseY > yPos - 22 &&
    mouseY < yPos + 22
  );
}

function drawGuideBubble() {
  let message;
  textFont("Times New Roman");
  if (love < 40) message = "I have a crush on him...";
  else if (love < 80) message = "Naji's so hot";
  else if (love < 120) message = "Friends with Benefits?";
  else if (love < 160) message = "I love him";
  else message = "I want him to be my husband <3";

  let cx = width / 2;
  let cy = 130 + sin(frameCount * 0.05) * 3;

  push();
  translate(cx, cy);

  fill(255, 250, 255);
  noStroke();

  ellipse(0, 0, 220, 90);
  ellipse(-80, 10, 100, 80);
  ellipse(80, 10, 100, 80);
  ellipse(-40, -30, 120, 100);
  ellipse(40, -35, 130, 110);
  ellipse(0, 30, 120, 80);

  ellipse(-140, 100, 60, 40);
  ellipse(-160, 120, 60, 50);
  ellipse(-120, 120, 60, 40);
  ellipse(140, 100, 60, 40);
  ellipse(150, 120, 60, 50);
  ellipse(120, 120, 60, 40);

  fill(60);
  textSize(15);
  text(message, 0, 0);

  pop();
}

function spawnEmojis(x, y) {
  let options = ["😘", "💌", "💋", "💖"];
  for (let i = 0; i < 6; i++) {
    emojis.push({
      x: x,
      y: y,
      emoji: random(options),
      speedX: random(-2, 2),
      speedY: random(-3, -1),
      life: 60,
    });
  }
}

function updateEmojis() {
  textSize(22);
  for (let i = emojis.length - 1; i >= 0; i--) {
    let e = emojis[i];
    e.x += e.speedX;
    e.y += e.speedY;
    e.life--;
    text(e.emoji, e.x, e.y);

    if (e.life <= 0) {
      emojis.splice(i, 1);
    }
  }
}

function drawEnding() {
  fill(255);
  textSize(26);
  text("She fell for you 💞", width / 2, height - 200);
  textSize(12);
  text("You unlocked something…", width / 2, height - 160);

  drawSecretButton();
  drawRestartButton();
}

function drawSecretButton() {
  rectMode(CENTER);
  fill(255, 220, 235);
  stroke(255, 150, 190);
  strokeWeight(3);
  rect(width / 2, height - 100, 260, 55, 40);

  noStroke();
  fill(60);
  textSize(16);
  text("🎧 A playlist for my baby", width / 2, height - 100);
}

function drawRestartButton() {
  rectMode(CENTER);
  fill(245, 235, 255);
  stroke(200, 170, 230);
  strokeWeight(2);
  rect(width - 70, 50, 110, 40, 25);

  noStroke();
  fill(70);
  textSize(14);
  text("↺ Restart", width - 70, 50);
}

function restartGame() {
  love = 0;
  gameState = "playing";
  emojis = [];
}
