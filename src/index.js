const Joi = require("joi");
var cors = require("cors");
const convUserSubmittedFormDataToArray = require("./dealCardsHandlerHelpers")
  .convUserSubmittedFormDataToArray;
const shuffle = require("./dealCardsHandlerHelpers").shuffle;
const dealCards = require("./dealCardsHandlerHelpers").dealCards;
const sendEmail = require("./email").sendEmail;

// tutorial based off this: https://www.youtube.com/watch?v=pKd0Rpw7O48
const express = require("express");
const app = express(); // loads a top level express app

// This is essentially adding a piece of middleware
// https://youtu.be/pKd0Rpw7O48?t=1965
// else at the bottom in the POST request when u try and access re.body.name
// it will not work
app.use(express.json()); // enables parsing of JSON in the body of reqs
app.use(cors());

const PORT = process.env.PORT || 8080;

// takes 2 params a route and a callback function which is the route handler
app.get("/", (req, res) => {
  res.send("My goodness");
  console.log(
    shuffle(["merlin", "merlin", "assassin", "assassin", "LS", "LS", "Morgana"])
  );
});

app.post("/", (req, res) => {
  console.log("Serving POST /");
  res.send("This is a POST req");
});

// ACTUAL AVALON ENDPOINTS

// to prevent v1 of app still working
// going to kill previous server cos GAE was charging me a lot for some reason??
// eventhough my app barely received any traffic whatsover...
app.get("/api/v1/dealCards", (req, res) => {
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
  let shuffledCards = shuffle(tenPlayerDeck);
  let dealt = dealCards(shuffledCards);
  res.send(dealt);
  console.log("Request received on GET /api/v1/dealCards");
});

app.post("/api/dealCards", (req, res) => {
  // (1) input validation on what client sends server
  const FormSchema = {
    merlin: Joi.number()
      .min(1)
      .required(),
    percival: Joi.number(),
    loyalServant: Joi.number()
      .min(1)
      .required(),
    assassin: Joi.number(),
    minion: Joi.number()
      .min(1)
      .required(),
    morgana: Joi.number(),
    mordred: Joi.number(),
    oberon: Joi.number()
  };
  const result = Joi.validate(req.body, FormSchema);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  // (2) some basic logging on server
  console.log(result);
  console.log("Request received at /dealCards");
  // console.log(req.headers);

  // (3) endpoint "busiess logic" starts here
  let cardsFromUser = convUserSubmittedFormDataToArray(req.body);
  let shuffledCards = shuffle(cardsFromUser);
  let dealt = dealCards(shuffledCards);

  // (4) build response object to send back to client
  let returnObj = {
    shuffledCards: shuffledCards,
    dealt: dealt,
    reqBody: req.body
  };

  res.send(returnObj);
});

app.post("/api/dealAndDistribute", (req, res) => {
  // (1) TODO: input validation on what client sends server
  const FormSchema = {
    formData: {
      merlin: Joi.number()
        .min(1)
        .required(),
      percival: Joi.number(),
      loyalServant: Joi.number()
        .min(1)
        .required(),
      assassin: Joi.number(),
      minion: Joi.number()
        .min(1)
        .required(),
      morgana: Joi.number(),
      mordred: Joi.number(),
      oberon: Joi.number()
    },
    emails: {
      password: Joi.string().required(),
      "Player 1": Joi.string(),
      "Player 2": Joi.string(),
      "Player 3": Joi.string(),
      "Player 4": Joi.string(),
      "Player 5": Joi.string(),
      "Player 6": Joi.string(),
      "Player 7": Joi.string(),
      "Player 8": Joi.string(),
      "Player 9": Joi.string(),
      "Player 10": Joi.string(),
      "Player 11": Joi.string(),
      "Player 12": Joi.string(),
      "Player 13": Joi.string(),
      "Player 14": Joi.string(),
      "Player 15": Joi.string(),
      "Player 16": Joi.string(),
      "Player 17": Joi.string(),
      "Player 18": Joi.string(),
      "Player 19": Joi.string(),
      "Player 20": Joi.string()
    }
  };

  const result = Joi.validate(req.body, FormSchema);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  // if wrong password just return and don't send emails or anything
  if (req.body.emails["password"] !== process.env.PASSWORD) {
    console.log("Wrong password");
    res.status(400).send("Wrong password");
    return;
  }

  console.log(req.body);
  res.send("Hey this is a new endpoint");

  // (2) some basic logging on server
  console.log("Request received at /dealAndDistribute");

  // (3) endpoint "busiess logic" starts here
  let cardsFromUser = convUserSubmittedFormDataToArray(req.body.formData);
  let shuffledCards = shuffle(cardsFromUser);
  console.log("Shuffled cards: ", shuffledCards);

  // (4) send out email with each player's dealt cards!
  shuffledCards.forEach((item, index) => {
    let playerIndex = index + 1;
    let recipientEmail = req.body.emails["Player " + playerIndex];
    console.log("Ran from forEach", recipientEmail);
    console.log(item);
    sendEmail(recipientEmail, item); // careful there is 200 email/day limit
  });
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
