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
var vijandX = [200, 400, 600, 800, 1000];
var vijandY = [600,400,200, 100, 300];
var vijandSnelheid = 3; // snelheid van de vijand


var toetsnu = false;
var toetsnet = false;

var img; //plaatje

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  toetsnet = toetsnu;
  toetsnu = keyIsDown(32);
  if (toetsnet === false && toetsnu === true) {
    spelerY = spelerY - 70;
  }
  else {
    spelerY = spelerY + 4
  }

  if (
    spelerY < 50 ||
    spelerY > 720
  ) {
    spelStatus = GAMEOVER;
  }

  // vijand
  
  for (var t=0; t < vijandY.length ;t=t+1) {
    vijandX[t] = vijandX[t] - vijandSnelheid;
    if (vijandX[t] < -100) {
      vijandX[t] = random(100,800);  // reset de x-positie van de vijand als hij buiten het scherm verdwijnt
    }
  }

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
  if ( vijandX - spelerX > -10 &&
    vijandX - spelerX < 10 &&
    spelerY - vijandY0 >0) { // checkt of de speler binnen de hoogte van de vijand is
    spelStatus = GAMEOVER;
  }
 
      if (vijandX - spelerX > -10 &&
    vijandX - spelerX < 10 &&
    spelerY - vijandY4 >0
) { // checkt of de speler binnen de hoogte van de vijand is
    spelStatus = GAMEOVER;
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
  rect(vijandX - 0, vijandY0 , 100, 720) 
  rect(vijandX - 200, vijandY1 , 100, 720)
  rect(vijandX - 400, vijandY2 , 100, 720)
  rect(vijandX - 600, vijandY3 , 100, 720)
  rect(vijandX - 800, vijandY4 , 100, 720)
  
  // kogel
  // speler
  fill('blue')
  ellipse (spelerX, spelerY, 40, 40); // teken de speler als een blauwe cirkel
textSize(30);
fill('white');
text("Score: ", 20, 40); // toon de score op het scherm
};

/**

Reset de game na een gameover
*/
var resetGame = function() {
spelerX = 430; // reset de x-positie van de speler
spelerY = 200; // reset de y-positie van de speler
vijandX = 430; // reset de x-positie van de vijand
vijandY = 600; // reset de y-positie van de vijand
spelStatus = SPELEN; // reset de spelstatus naar SPELEN
};
/* ********************************************* /
/ functies van de p5 library /
/ ********************************************* */

function preload() {
img = loadImage('achtergrond.png'); // laad de achtergrond afbeelding
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
} else if (spelStatus === GAMEOVER) {
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
