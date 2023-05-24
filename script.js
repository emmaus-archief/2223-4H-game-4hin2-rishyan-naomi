"use strict";
// Vijand = SnoopDogg
// Speler = Jointje

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

// Speler aangemaakt
var spelerX = 430;
var spelerY = 200;

// Vijand aangemaakt
var vijandX = [800, 1200, 1600, 2000, 2400];
var vijandY = [600, 400, 200, 100, 300];

// Munten aangemaakt
var muntX = [1000, 1400, 1800, 2200, 2600];
var muntY = [500, 300, 100, 200, 400];
var muntGepakt = [false, false, false, false, false];

// Beweegsnelheid van Vijand en munten
var vijandSnelheid = 3;
var muntSnelheid = 2;

// Score, highscore en aantal opgepakte munten
var score = 0;
var highScore = 0;
var muntenGepakt = 0;

// Tijd en timer interval
var tijd = 0;
var timerInterval = 1000; // 1 seconde

// Niet dubbeldrukken
var toetsnu = false;
var toetsnet = false;

// Decoratie voor Vijand+Speler+achtergrond
var img;
var karakter;
var SpelerImg;
var muntImg;

// Random cijfer maken
function krijgWillekeurigCijfer(max) {
  return Math.floor(Math.random() * max);
}

// Laat het game bewegen
var beweegAlles = function() {
  toetsnet = toetsnu; // Zorgen dat er niet ingedrukt kan worden
  toetsnu = keyIsDown(32) || mouseIsPressed; // Speler een richting geven
  if (toetsnet === false && toetsnu === true) {
    spelerY = spelerY - 70; // Standaard naar beneden
  } else {
    spelerY = spelerY + 4; // 1x omhoog met Spacebar
  }

  console.log("SpelerY:", spelerY);
  // Als speler buiten het speelvlak gaat is gameover
  if (spelerY < 50 || spelerY > 720) {
    spelStatus = GAMEOVER;
  }

  for (var t = 0; t < vijandY.length; t = t + 1) {
    vijandX[t] = vijandX[t] - vijandSnelheid;
    if (vijandX[t] < -100) {
      score++;
      vijandX[t] = random(1000, 1500);
      vijandY[t] = random(100, 400);
    }
  }

  for (var i = 0; i < muntY.length; i++) {
    muntX[i] = muntX[i] - muntSnelheid;
    if (muntX[i] < -100) {
      muntX[i] = random(1000, 1500);
      muntY[i] = random(100, 400);
      muntGepakt[i] = false;
    }
  }

  tijd += deltaTime; // Tijd bijhouden
  if (tijd >= timerInterval) {
    tijd = 0; // Reset de tijd
    vijandSnelheid += 0.5; // Verhoog de vijandsnelheid na elke 10 seconden
  }
};

// Verwerk botsing met vijand en munten
var verwerkBotsing = function() {
  for (var t = 0; t < vijandY.length; t = t + 1) {
    if (
      spelerX < vijandX[t] + 80 &&
      spelerX + 50 > vijandX[t] &&
      spelerY < vijandY[t] + 200 &&
      spelerY + 50 > vijandY[t]
    ) {
      spelStatus = GAMEOVER;
      break;
    }
  }

  for (var i = 0; i < muntY.length; i++) {
    if (
      spelerX < muntX[i] + 50 &&
      spelerX + 50 > muntX[i] &&
      spelerY < muntY[i] + 50 &&
      spelerY + 50 > muntY[i] &&
      !muntGepakt[i]
    ) {
      muntGepakt[i] = true;
      score++;
      muntenGepakt++;
    }
  }
};

// Teken alle elementen van het spel
var tekenAlles = function() {
  image(img, 0, 0, 1500, 750);

  fill("black");

  for (var t = 0; t < vijandY.length; t = t + 1) {
    image(SpelerImg, vijandX[t], vijandY[t], 80, 200);
  }

  for (var i = 0; i < muntY.length; i++) {
    if (!muntGepakt[i]) {
      image(muntImg, muntX[i], muntY[i], 50, 50);
    }
  }

  image(karakter, spelerX, spelerY, 75, 75);

  textSize(30);
  fill("white");
  text("Jonko vrij: " + score, 20, 40);
  text("Highscore: " + highScore, 20, 80);
  text("Munten gepakt: " + muntenGepakt, 20, 120);
};

// Reset het spel
var resetGame = function() {
  spelerX = 430;
  spelerY = 200;
  vijandX = [800, 1200, 1600, 2000, 2400];
  vijandY = [600, 400, 200, 100, 300];
  muntX = [1000, 1400, 1800, 2200, 2600];
  muntY = [500, 300, 100, 200, 400];
  muntGepakt = [false, false, false, false, false];
  spelStatus = SPELEN;
  vijandSnelheid = 3;
};

function preload() {
  img = loadImage("Illustraties/Achtergrond.png");
  karakter = loadImage("Illustraties/karakter.png");
  SpelerImg = loadImage("Illustraties/Speler.png");
  muntImg = loadImage("Illustraties/munt.png");
}

function setup() {
  createCanvas(1280, 720); // Maak een canvas van 1280 x 720 pixels
  frameRate(60); // Zet de framesnelheid op 60 frames per seconde
}

function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
  } else if (spelStatus === GAMEOVER) {
    if (score > highScore) {
      highScore = score;
    }
    score = 0;
    muntenGepakt = 0;
    textSize(40);
    fill("white");
    textAlign(CENTER, CENTER);
    text(
      "Snoop Dogg heeft de jonko, Druk enter om opnieuw te gaan",
      width / 2,
      height / 2
    );
  }
}

function keyPressed() {
  if (keyCode === ENTER && spelStatus === GAMEOVER) {
    resetGame();
  }
}
