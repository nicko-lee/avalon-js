// var characters = [
//   "Merlin",
//   "Percival",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Assassin",
//   "Minion",
//   "Minion",
//   "Minion"
// ];

// var charactersMap = {
//   0: "Merlin",
//   1: "Percival",
//   2: "Loyal Servant",
//   3: "Loyal Servant",
//   4: "Loyal Servant",
//   5: "Loyal Servant",
//   6: "Assassin",
//   7: "Minion",
//   8: "Minion",
//   9: "Minion"
// };

// // for 10 player game
// var charactersMap = new Map();
// charactersMap
//   .set(0, "Merlin")
//   .set(1, "Percival")
//   .set(2, "Loyal Servant")
//   .set(3, "Loyal Servant")
//   .set(4, "Loyal Servant")
//   .set(5, "Loyal Servant")
//   .set(6, "Assassin")
//   .set(7, "Minion")
//   .set(8, "Minion")
//   .set(9, "Minion");

// // random number generator
// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

// function getRandomCharacter() {
//   r = getRandomInt()
// }

// function dealCards(numberOfPlayers) {
//   var dealtCards = new Map();

//   // grab random number and random card from "deck" and insert into dealt cards
//   var r = getRandomInt(numberOfPlayers);
//   console.log("Am inside dealCards and this is the randomInt:", r);
//   var card = charactersMap.get(r);
//   console.log(card);
//   dealtCards.set("Player 1", card);

//   // remove dealt card from deck
//   charactersMap.delete(r);

//   // return dealt cards
//   return dealtCards;
// }

// console.log(getRandomInt(10));
// console.log("Initial: ", charactersMap.keys());
// console.log(charactersMap.keys());
