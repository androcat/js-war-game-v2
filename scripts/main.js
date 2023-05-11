(function () {
  "use strict";

  // Array of card values and suites
  const cardValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const cardSuites = ["Diamonds", "Hearts", "Spades", "Clubs"];

  // constructor for Game, Player, Deck, and Card
  function Card({ value = 0, suite = "" } = {}) {
    this.value = value;
    this.suite = suite;
  }
  function Deck({ deckOfCards = [] } = {}) {
    this.deckOfCards = deckOfCards;
  }
  // Returns an array of strings ex: 5 of Hearts
  Card.prototype.buildDeck = function (arrValues, arrSuites) {
    let deck = [];
    for (const val of arrValues) {
      for (const suite of arrSuites) {
        deck.push(`${val} of ${suite}`);
      }
    }
    return deck;
  };

  let testCard = new Card();
  const deckArr = testCard.buildDeck(cardValues, cardSuites);
  let testDeck = new Deck();
  console.table(deckArr);

  function Player({ cards = [] } = {}) {
    this.cards = cards;
  }
  function Game() {}
})();
