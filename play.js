var Word = require("./word.js");
var prompt = require("prompt");

prompt.start();

var game = {
  wordBank: ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
  guessesRemaining: 10,
  currentWrd: null,
  startGame: function(wrd) {
    var randomNumber = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = new Word(this.wordBank[randomNumber]);
    this.currentWrd.getLets();
    this.keepPromptingUser();
  },
  keepPromptingUser: function() {
    var self = this;
    prompt.get(["guessLetter"], function(err, result) {
      console.log("The letter you guessed is: " + result.guessLetter);
      var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
      if (findHowManyOfUserGuess === 0) {
        console.log("You guessed wrong!");
        self.guessesRemaining -= 1;
      } else {
        console.log("You guessed right!");
        if (self.currentWrd.didWeFindTheWord() === true) {
          console.log("You won!");
          return 1;
        }
      }
      console.log("Guesses remaining: " + self.guessesRemaining);
      console.log(self.currentWrd.wordRender());
      if (self.guessesRemaining > 0 && self.currentWrd.found === false) {
        self.keepPromptingUser();
      } else if (self.guessesRemaining === 0) {
        console.log("Game over...");
        console.log("The word was: " + self.currentWrd.word);
      } else {
        console.log(self.currentWrd.wordRender());
      }
    });
  }
};

game.startGame();
