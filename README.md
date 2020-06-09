# Avalon Game Dealer Assistant

![enter image description here](https://assets.dicebreaker.com/the-resistance-avalon-board-game-artwork.jpg/BROK/resize/1920%3E/format/jpg/quality/80/the-resistance-avalon-board-game-artwork.jpg)

## Note

This is part of my personal Project Avalon. It consists of a React front-end client running on Firebase Hosting that consumes this Node JS Express App which is running on Google App Engine (standard environment).

Link to repo for React JS Client App that consumes this API: https://github.com/nicko-lee/avalon-react-client

## What is Avalon?

For disambiguation Avalon refers to the [Resistance: Avalon boardgame](https://boardgamegeek.com/boardgame/128882/resistance-avalon).

## Some Background

During the COVID-19 shutdown period, like many others, some colleagues of mine were trying to figure out ways to have some virtual social interaction to replace the lack of in-person social interactions.

One thing we liked to at work on some Friday afternoons would be to organize some board game sessions, particularly Avalon.

The challenge fell to me to organise a virtual session of Avalon over Zoom.

This was a bit tricky at first as there were many moving parts. A board, many pieces and all the while the face-to-face interaction is the foundation of this game which is based on deception 😛

My crude solution was to have two Zoom meetings open. One dedicated for the board and tracking the board "game state" and the other Zoom meeting would be for the face-to-face arguments and accusations 🤣

And the card distribution stage at the beginning was tricky. Each new game everyone (about 10 players per session usually) would have to wait and have some "down time" while I would "seed" the board and setup a new game including dealing cards and distributing it (via Slack).

Then there was the vote phase. Each quest players would be selected to vote Pass or Fail in secret to either expedite or sabotage the quest. Again the way this was done was players would Slack me personally and I would aggregate the results and communicate it via a Slack group/channel.

So in short this could get tedious and tricky quite quickly. It required one person who had to act "full-time" as the "game logic" or "router." I found myself just routing a lot of messages and performing some logic and then routing it back to the right channels again.

This meant the "Dealer" cannot play. And must just watch and deal and facilitate. And must pay close attention and not make a mistake or stuff up the gaming experience.

## What does this Avalon App do?

So this Avalon App is designed to help the "Dealer" and make his or her life easier.

The three main tasks of the Dealer in remote-based Avalon is:

1. Create new game based on number of players (in Avalon different number of players have different setup rules. Plus you can also customise each deck to add special characters which adds complexity). This is a bit time-consuming
2. Distribute cards in secret (so nobody can see other people's card). And ensure all special characters know the additional information that they need to operate. E.g. Merlin needs to know all the Minions before the game begins
3. During the Quest Voting phase collect all votes from quest participants, summarise and communicate results

This app aims to solve the first two points above. And the third point can be achieved through Slack anonymous voting using a Slack app like /polly

In short the key benefits are:

1.  Much faster game setup
2.  Less scope for error
3.  No need for dedicated game "Dealer"

## Demo App

[Here is a running instance deployed on Firebase](https://avalon-react.firebaseapp.com/) and dependent on this Node JS API running on Google App Engine (standard environment).

Link to repo for React JS Client App that consumes this API: https://github.com/nicko-lee/avalon-react-client
