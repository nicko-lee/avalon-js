const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

function sendEmail(recipient, character, message) {
  return mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_EMAIL,
            Name: "The Dealer"
          },
          To: [
            {
              Email: recipient
            }
          ],
          Subject: "Your Avalon Character",
          TextPart: `You were dealt: ${character}. Here is what you need to know: ${message}`,
          HTMLPart: ""
        }
      ]
    })
    .then(result => {
      // do something with the send result or ignore
      console.log(result.body);
    })
    .catch(err => {
      // handle an error
      console.log(err.statusCode, err.Messages, err.Subject);
    });
}

// export from file so I can import it in avalon.js
module.exports = { sendEmail };
