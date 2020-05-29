// import statements
const shuffle = require("./shuffleDeck").shuffle;
const eightPlayerDeck = require("./shuffleDeck").eightPlayerDeck;
const ninePlayerDeck = require("./shuffleDeck").ninePlayerDeck;
const tenPlayerDeck = require("./shuffleDeck").tenPlayerDeck;

function dealCards(numberOfPlayers) {
  var dealtCards = {};
  var newGameDeck;

  if (numberOfPlayers === 8) {
    newGameDeck = shuffle(eightPlayerDeck);
  } else if (numberOfPlayers === 9) {
    newGameDeck = shuffle(ninePlayerDeck);
  } else {
    newGameDeck = shuffle(tenPlayerDeck);
  }

  // console.log("I am in dealCards and this is newGameDeck: ", newGameDeck);

  newGameDeck.forEach((card, index) => {
    // console.log(card);

    // add dealt card to set
    dealtCards[index] = card;
  });

  // return dealt cards
  return dealtCards;
}

console.log("Results: ", dealCards(8));
console.log("Results: ", dealCards(9));
console.log("Results: ", dealCards(10));

// export from file so I can import it in avalon.js
module.exports = { dealCards };
