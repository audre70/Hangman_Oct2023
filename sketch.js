/*
Assignment 5: Array Methods and Strings
Creative Coding, Loveless F23

Title: HANGMAN!
By: Audrey Vo 10/16/23

// INSTRUCTIONS: 
// guess the word by typing in letters.
// try not to kill the hangman.

*/


var wordsPossible = ["orchid", "dinosaur", "knight", "macaroni", "subway", "lovely"];
var secretWord = "";
var playerGuess = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

function preload() {
  rainyHearts = loadFont("rainyhearts.ttf");
  // credits to https://www.dafont.com/rainyhearts.font
}

function setup() {
  createCanvas(500, 500);
  background(250, 240, 230);
  refreshGame();
  
  /* TITLE CARD */
  textAlign(CENTER, BASELINE);
  textFont(rainyHearts);
  stroke(87, 117, 144);
  fill(249, 132, 74);
  textSize(40);
  text("Let's Play Hangman", width/2, 60);
  
  /* BORDER BOX */
  stroke(249, 132, 74);
  strokeWeight(3);
  line(20, 20, width-20, 20); // top line
  line(20, height-20, width-20, height-20); // bottom line
  line(20, 20, 20, height-20); // left line
  line(width-20, 20, width-20, height-20); // right line
  
  /* HANGER */
  stroke(87, 117, 144);
  line(150, 110, 150, 310); // vertical
  line(150, 110, 240, 110); // top horizontal
  line(240, 110, 240, 130); // hanger
  line(100, 310, 350, 310);
}

function draw() {
  drawHangman();
  printWord();

  if (wrongGuesses >= maxWrongGuesses) {
    fill(249, 65, 68);
    stroke(87, 117, 144);
    text("GAME", 370, height/2-50);
    text("OVER", 370, height/2-10);
    noLoop();
  } else if (playerGuess.join('') === secretWord) { // join is an array method that joins the array contents into a string.
    // https://p5js.org/reference/#/p5/join
    fill(249, 199, 79);
    stroke(87, 117, 144);
    text("YOU", 370, height/2-50);
    text("WIN :)", 370, height/2-10);
  }
  
}
/* ------------------CUSTOM FUNCS---------------------- */
function refreshGame() {
  secretWord = random(wordsPossible); // chooses a random word within the array.
  for (i = 0; i < secretWord.length; i++) {
    playerGuess.push(""); // array method that creates empty array of the same length as secret word, for the user to fill in with guesses.
  }
  wrongGuesses = 0; // inital state.
  redraw(); // https://p5js.org/reference/#/p5/redraw
}


function keyPressed() {
  if (key.length === 1) {
    let letter = key;
    if (!playerGuess.includes(letter)) { // BOOLEAN OPERATOR. means if the player has NOT guessed the letter before.
      if (secretWord.includes(letter)) {
      // key MUST fulfill two conditions of being NOT guessed before and being a letter in the target word
        let wordArray = secretWord.split(''); // Split the word into an array of strings
        for (let i = 0; i < secretWord.length; i++) { // sort through array of key inputs to see if they match with the target word (var secretWord)
          if (wordArray[i] === letter) {
            playerGuess[i] = letter;
            // makes sure that the particular index for the letter guessed is the SAME in both the user guessed array and the wordArray (array of letters of secret word). Important for printWord() function.
          }
        }
      } else {
        wrongGuesses++;
      }
    }
  }
}

function drawHangman() {
  if (wrongGuesses >= 1) {
    /* HEAD */
    stroke(87, 117, 144);
    ellipseMode(CORNERS);
    fill(250, 240, 230);
    ellipse(220, 130, 260, 170);
    // console.log("hello");
  }
  if (wrongGuesses >= 2) {
    /* BODY */
    line(240, 170, 240, 230);
  }
  if (wrongGuesses >= 3) {
    /* L-ARM */
    line(240, 180, 220, 210);
  }
  if (wrongGuesses >=4) {
    /* R-ARM */
    line(240, 180, 260, 210);
  }
  if (wrongGuesses >= 5) {
    /* L-LEG */
    line(240, 230, 220, 260);
  }
  if (wrongGuesses >= 6) {
    /* R-LEG */
    line(240, 230, 260, 260);
  }
  
}

function printWord() {
  noStroke();
  textSize(30);
  fill(67, 170, 139);
  textAlign(CENTER);
  let x = 100;
  let y = 400;
  
  for (let i = 0; i < secretWord.length; i++) {
    if (playerGuess[i] === "") {
      text("_", x, y); // write an underscore initially before the user guesses.
    } else {
      text(playerGuess[i], x, y); // every time the user guesses it appears
    }
    x += 40; // spacing between letters
  }
}
