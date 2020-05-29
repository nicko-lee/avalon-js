// sourced from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// 8 player deck
const eightPlayerDeck = [
  "Merlin",
  "Percival",
  "Loyal Servant",
  "Loyal Servant",
  "Loyal Servant",
  "Assassin",
  "Minion",
  "Minion"
];

// 9 player deck
const ninePlayerDeck = [
  "Merlin",
  "Percival",
  "Loyal Servant",
  "Loyal Servant",
  "Loyal Servant",
  "Loyal Servant",
  "Assassin",
  "Minion",
  "Minion"
];

// 10 player deck
const tenPlayerDeck = [
  "Merlin",
  "Percival",
  "Loyal Servant",
  "Loyal Servant",
  "Loyal Servant",
  "Loyal Servant",
  "Assassin",
  "Minion",
  "Minion",
  "Minion"
];

shuffle(tenPlayerDeck);
// console.log(tenPlayerDeck);

// export from file so I can import it in avalon.js
module.exports = { eightPlayerDeck, ninePlayerDeck, tenPlayerDeck, shuffle };
