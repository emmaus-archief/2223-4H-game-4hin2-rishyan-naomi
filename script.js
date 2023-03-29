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

var spelerX = 520; // x-positie van speler
var spelerY = 200; // y-positie van speler
var vijandX = 520;
var vijandY = 600;

var toetsnu = false;
var toetsnet = false;


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
  if (toetsnet === false && toetsnu === true){
    spelerY = spelerY -30;  }
  else{
    spelerY = spelerY +2
  } 

  if(
    spelerY < 50 ||
    spelerY > 720
    ){
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
  console.log("sX:", spelerX, "vX",vijandX);
  if (spelerX - vijandX <50
      &&spelerX - vijandX <-50
      && spelerY - vijandY<50
     && spelerY - vijandY<-50 ) {
    console.log('Botsing');
  }
  // update punten

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
fill('Green');
  rect(0,0,1280,720)
  // vijand
fill('black')
  rect(vijandX - 0,vijandY - 0,100,200)
  rect(vijandX - 200,vijandY - 200,100,400)
  // kogel
  // speler
  fill('blue')
  ellipse(spelerX-25, spelerY-25, 50, 50);

  
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

  }
}
