// following this tutorial: https://www.youtube.com/watch?v=Bs68k6xfR3E

const assert = require("assert"); // import node built-in assertion lib
const dealCardsHandlerHelpers = require("../src/dealCardsHandlerHelpers"); // import module to be tested

// set up a mocha test suite
describe("dealCardsHandlerHelpers tests", function() {
  // test first method in module
  describe("shuffle()", function() {
    it("should shuffle an unshuffled array of cards and give a random result", function() {
      // prepare input test data
      const unshuffledDeck = [
        "merlin",
        "percival",
        "loyal servant",
        "minion",
        "assassin",
        "minion",
        "loyal servant",
        "loyal servant"
      ];
      let clone = unshuffledDeck.slice(0); // make a copy of original array
      // call function

      let shuffledDeck = dealCardsHandlerHelpers.shuffle(clone);
      // console.log(unshuffledDeck);
      // console.log(clone);
      // console.log(shuffledDeck);

      // make assertion
      assert(shuffledDeck !== unshuffledDeck);
    });

    // try out table driven testing
    it("should handle various different kinds of input data", function() {
      // prepare input test data
      var tests = [
        {
          args: [
            "morgana",
            "merlin",
            "loyal servant",
            "percival",
            "minion",
            "loyal servant"
          ]
        },
        {
          args: [
            "minion",
            "minion",
            "loyal servant",
            "merlin",
            "assassin",
            "mordred"
          ]
        }
      ];

      // call function and make assertion
      tests.forEach(function(test) {
        it("correctly shuffles an unshuffled deck", function() {
          let unshuffled = test.args.slice(0); // make a copy so won't mutate original
          let shuffled = dealCardsHandlerHelpers.shuffle(unshuffled);
          assert(shuffled !== unshuffled);
        });
      });
    });
  });

  // test second method in module
  describe("convUserSubmittedFormDataToArray()", function() {
    it("should convert user submitted form data into an array of cards", function() {
      // prepare input test data
      const formData = {
        merlin: "1",
        percival: "",
        morgana: "",
        oberon: "2",
        assassin: "1"
      };
      // let clone = unshuffledDeck.slice(0); // make a copy of original array
      // call function

      let arrayOfCards = dealCardsHandlerHelpers.convUserSubmittedFormDataToArray(
        formData
      );
      // console.log(unshuffledDeck);
      // console.log(clone);
      // console.log(shuffledDeck);

      // make assertion
      let result = ["merlin", "oberon", "oberon", "assassin"];
      assert.deepEqual(arrayOfCards, result);
    });
  });
});
