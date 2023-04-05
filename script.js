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
var vijandX = 430;
var vijandY = 600;

var toetsnu = false;
var toetsnet = false;

var img = 200; //plaatje

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

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen constructie
  console.log("sX:", spelerX, "vX", vijandX);
  if (vijandX - spelerX < 10
    && vijandY - spelerY < 10) {
    console.log('Botsing');
  }
  // update punten

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image(img,0,0,1500,750);
  // vijand
  fill('black')
  rect(vijandX - 0,vijandY - 0,100,200)
  rect(vijandX - 200,vijandY - 200,100,400)
  rect(vijandX - 400, vijandY - 300,100,600)
  // kogel
  // speler
  fill('blue')
  ellipse(spelerX - 25, spelerY - 25, 50, 50);


  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */


/**
* preload
* deze functie wordt 1x uitgevoerd voor set up 
* we laden hier de plaatjes
 */

function preload() {
img = loadImage('flappybird.png') 
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
console.log('Game Over, Druk op A voor nieuwe game.');
    textSize(50);
    fill('white');
    text('Game over, Druk op A voor een nieuwe spel',100,100);
    if (keyIsDown(65)){
      spelerY = 200;
      spelStatus = SPELEN;
    }
  }
}
