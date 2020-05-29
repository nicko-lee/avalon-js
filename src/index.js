var http = require("http");
var url = require("url");
const dealCards = require("./avalon.js").dealCards;
var PORT = process.env.PORT || 8080

//create a server object:
var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  console.log(page);
  if (page === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hi welcome to Avalon.");
  } else if (page === "/dealCards") {
    // call "business logic"
    var dealt = dealCardsAndStringify(10);

    // write HTTP response back to client
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(dealt);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Sorry page not found");
  }
  res.end();
});
server.listen(PORT);

function dealCardsAndStringify(players) {
  var dealt = dealCards(players);
  console.log("value of dealt: ", dealt);

  // convert map to array of tuples: https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
  var jsonText = JSON.stringify(Array.from(dealt.entries()));
  console.log("value of STRINGIFY dealt: ", jsonText);

  return jsonText;
}
