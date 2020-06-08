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

// // 8 player deck
// const eightPlayerDeck = [
//   "Merlin",
//   "Percival",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Assassin",
//   "Minion",
//   "Minion"
// ];

// // 9 player deck
// const ninePlayerDeck = [
//   "Merlin",
//   "Percival",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Loyal Servant",
//   "Assassin",
//   "Minion",
//   "Minion"
// ];

// // 10 player deck
// const tenPlayerDeck = [
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

// shuffle(tenPlayerDeck);
// // console.log(tenPlayerDeck);

// app.get("/dealCards", (req, res) => {
//   res.send(dealCards());
// });

// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//     {
//       From: {
//         Email: process.env.EMAIL,
//         Name: "Nala"
//       },
//       To: [
//         {
//           Email: process.env.EMAIL,
//           Name: "Nala"
//         }
//       ],
//       Subject: "Greetings from Mailjet.",
//       TextPart: "My first Mailjet email",
//       HTMLPart:
//         "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       CustomID: "AppGettingStartedTest"
//     }
//   ]
// });
// request
//   .then(result => {
//     console.log(result.body);
//   })
//   .catch(err => {
//     console.log(err.statusCode);
//   });

// res.header("Access-Control-Allow-Origin", "*");
// res.header(
//   "Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept"
// );

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

// reading params (which are diff from query string params)
// query params a way to provide extra optional data to a server on the back of a GET req
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); // returns bool
  if (!course)
    res.status(404).send("The course with the given id was not found");
  res.send(course);
});

// get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // create a new course object based on incoming request
  // then save to "in-memory DB" which is just our empty array
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
