// tutorial based off this: https://www.youtube.com/watch?v=pKd0Rpw7O48
const express = require("express");
const app = express(); // loads a top level express app

// This is essentially adding a piece of middleware
// https://youtu.be/pKd0Rpw7O48?t=1965
// else at the bottom in the POST request when u try and access re.body.name
// it will not work
app.use(express.json()); // enables parsing of JSON in the body of reqs

const PORT = process.env.PORT || 8080;

const dealCards = require("./avalon.js").dealCards;

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

// takes 2 params a route and a callback function which is the route handler
app.get("/", (req, res) => {
  res.send("My goodness");
});

app.post("/", (req, res) => {
  res.send("This is a POST req");
});

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

// ACTUAL AVALON ENDPOINTS
app.get("/dealCards", (req, res) => {
  res.send(dealCards());
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
