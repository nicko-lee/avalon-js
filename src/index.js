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

app.post("/api/dealCards", (req, res) => {
  // (1) input validation on what client sends server
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

  console.log(req.body);
  console.log("emails: ", req.body.emails["Player 1"]);
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
    sendEmail(recipientEmail, item);
  });
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
