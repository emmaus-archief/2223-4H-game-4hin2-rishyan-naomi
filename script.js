/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 430; // x-positie van speler
var spelerY = 200; // y-positie van speler
var vijandX = [800, 1200, 1600, 2000, 2400];
var vijandY = [600, 400, 200, 100, 300];
var vijandSnelheid = 3; // snelheid van de vijand
var score = 0;
var highScore = 0;


var toetsnu = false;
var toetsnet = false;

var img; //plaatje
var karakter;
var palmboomImg;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

function krijgWillekeurigCijfer(max) {
  return Math.floor(Math.random() * max);
}

var beweegAlles = function() {
  // Speler
  toetsnet = toetsnu;
  toetsnu = keyIsDown(32);
  if (toetsnet === false && toetsnu === true) {
    spelerY = spelerY - 70;
  } else {
    spelerY = spelerY + 4;
  }

  if (spelerY < 50 || spelerY > 720) {
    spelStatus = GAMEOVER;
  }

  // Vijand
  for (var t = 0; t < vijandY.length; t = t + 1) {
    vijandX[t] = vijandX[t] - vijandSnelheid;
    if (vijandX[t] < -100) {
      vijandX[t] = random(1000, 1500); // Reset the x-position of the enemy with a random value between 1200 and 1500
      vijandY[t] = random(100, 400); // Reset the y-position of the enemy with a random value between 100 and 600
    }
  }
};


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // Check collision between player and enemy
  for (var t = 0; t < vijandY.length; t = t + 1) {
    if (
      spelerX < vijandX[t] + 80 && // Check if player's right edge is to the right of the enemy's left edge
      spelerX + 50 > vijandX[t] && // Check if player's left edge is to the left of the enemy's right edge
      spelerY < vijandY[t] + 200 && // Check if player's bottom edge is below the enemy's top edge
      spelerY + 50 > vijandY[t] // Check if player's top edge is above the enemy's bottom edge
    ) {
      spelStatus = GAMEOVER; // Set spelStatus to GAMEOVER if there is a collision
      break; // Exit the loop since we only need to detect one collision
    }
  }
};


/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image(img, 0, 0, 1500, 750);
  // vijand
  fill('black')

  for (var t = 0; t < vijandY.length; t = t + 1) {
    image(palmboomImg, vijandX[t], vijandY[t], 80, 200); // Draw the image at the specified enemy positions
  }

  image(karakter, spelerX, spelerY, 50, 50);

  // kogel
  // speler
  // fill('blue');
  // ellipse(spelerX, spelerY, 40, 40); // teken de speler als een blauwe cirkel
  textSize(30);
  fill('white');
  text("puntenaantal: " + score, 20, 40); // toon de score op het scherm
  highScore == 0 ? console.log("") : text("Hoogste puntenaantal: " + highScore, 20, 40); 
};

/**

Reset de game na een gameover
*/
var resetGame = function() {
  spelerX = 430; // reset de x-positie van de speler
  spelerY = 200; // reset de y-positie van de speler
  vijandX = [800, 1200, 1600, 2000, 2400];
  vijandY = [600, 400, 200, 100, 300];// reset de y-positie van de vijand
  spelStatus = SPELEN; // reset de spelstatus naar SPELEN
};
/* ********************************************* /
/ functies van de p5 library /
/ ********************************************* */

function preload() {
  img = loadImage('achtergrond.png'); // laad de achtergrond afbeelding
  karakter = loadImage('karakter.png');
  palmboomImg = loadImage('palmboom.png'); // Load the palmboom image
}

function setup() {
  createCanvas(1280, 720); // maak een canvas van 960 x 540 pixels
  frameRate(60); // zet de framesnelheid op 60 frames per seconde
}

function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles(); // update de posities van speler, vijanden en kogels
    verwerkBotsing(); // check op botsingen
    tekenAlles(); // teken het spelscherm
    score++;
  } else if (spelStatus === GAMEOVER) {
    score = 0;
    highScore < score ? highScore = score : console.log("nee!")
    textSize(60);
    fill('white');
    textAlign(CENTER, CENTER);
    text("GAME OVER, Druk op enter", width / 2, height / 2); // toon GAME OVER tekst in het midden van het scherm
  }
}

function keyPressed() {
  if (keyCode === ENTER && spelStatus === GAMEOVER) {
    resetGame(); // reset de game bij het indrukken van de ENTER toets na een gameover
  }
}
