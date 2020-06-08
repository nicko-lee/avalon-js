// takes the form object submitted by user and turns it into an array of cards
function convUserSubmittedFormDataToArray(reqData) {
  let cardsArr = [];
  for (let [key, value] of Object.entries(reqData)) {
    // whatever $value is create the number of corresponding cards and push to array
    for (let i = 0; i < value; i++) {
      cardsArr.push(key);
    }
  }
  return cardsArr;
}

// sourced from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// this does the "shuffling" work by randomizing cards in the array
// note it mutates the original array and doesn't work on a copy
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

// it takes in a shuffled deck array and returns a JS object mapping players to their cards
function dealCards(shuffledDeck) {
  let dealtCards = {};

  shuffledDeck.forEach((card, index) => {
    // add dealt card to set
    dealtCards[index] = card;
  });

  // return dealt cards
  return dealtCards;
}

// export from file so I can import it in avalon.js
module.exports = { shuffle, dealCards, convUserSubmittedFormDataToArray };
