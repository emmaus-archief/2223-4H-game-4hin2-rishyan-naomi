"use strict"
//Vijand=SnoopDogg
//Speler=Jointje


const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

//Speler aangemaakt
var spelerX = 430; 
var spelerY = 200; 

//Vijand aangemaakt
var vijandX = [800, 1200, 1600, 2000, 2400];
var vijandY = [600, 400, 200, 100, 300];

//beweegsnelheid van Vijand
var vijandSnelheid = 3; 

//Score 
var score = 0;
var highScore = 0;

//Niet dubbeldrukken
var toetsnu = false;
var toetsnet = false;

//Decoratie voor Vijand+Speler+achtergrond
var img;
var karakter;
var SpelerImg;

//Random cijfer maken 
function krijgWillekeurigCijfer(max) {
  return Math.floor(Math.random() * max);
}

//Laat het game bewegen
var beweegAlles = function() {
  toetsnet = toetsnu; // zorgen dat er niet ingedrukt kan worden
  toetsnu = keyIsDown(32); // Speler een richting geven
  if (toetsnet === false && toetsnu === true) {
    spelerY = spelerY - 70; // standaard naar beneden 
  } else {
    spelerY = spelerY + 4; //1x omhoog met Spacebar
  }

  //als soeler buiten het speelvlak gaat is gameover
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
};

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
};



var tekenAlles = function() {

  image(img, 0, 0, 1500, 750);

  fill('black')

  for (var t = 0; t < vijandY.length; t = t + 1) {
    image(SpelerImg, vijandX[t], vijandY[t], 80, 200); 
  }

  image(karakter, spelerX, spelerY, 75, 75);

  textSize(30);
  fill('white');
  text("score: " + score, 20, 40); 
  highScore == 0 ? console.log("") : text("score: " + highScore, 20, 40); 
};

var resetGame = function() {
  spelerX = 430;
  spelerY = 200; 
  vijandX = [800, 1200, 1600, 2000, 2400];
  vijandY = [600, 400, 200, 100, 300];
  spelStatus = SPELEN; 
};

function preload() {
  img = loadImage('Illustraties/Achtergrond.png'); 
  karakter = loadImage('Illustraties/karakter.png');
  SpelerImg = loadImage('Illustraties/Speler.png');
}

function setup() {
  createCanvas(1280, 720); // maak een canvas van 960 x 540 pixels
  frameRate(60); // zet de framesnelheid op 60 frames per seconde
}

function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
  } else if (spelStatus === GAMEOVER) {
    score = 0;
    highScore < score ? highScore = score : console.log("Jonkogepakt")
    textSize(40);
    fill('white');
    textAlign(CENTER, CENTER);
    text("Snoop Dogg heeft de jonko, Druk enter om opnieuw te gaan", width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === ENTER && spelStatus === GAMEOVER) {
    resetGame();
  }
}
