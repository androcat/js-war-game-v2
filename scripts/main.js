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
    "Jack",
    "Queen",
    "King",
  ];

  const cardSuites = ["Diamonds", "Hearts", "Spades", "Clubs"];

  // constructor for Game, Player, Deck, and Card
  function Card({ value = "", suite = "" } = {}) {
    this.value = value;
    this.suite = suite;
  }
  // Returns an array of strings ex: 5 of Hearts

  function Deck({ cards = [] } = {}) {
    this.cards = cards; // needs to have 52 card objs
  }
  Deck.prototype.buildDeck = function (arrValues, arrSuites) {
    // let deck = Array(arrValues.length * arrSuites.length);

    // Why does this give only the first letter ???
    // A: it was bc i had it like: [val] and [suite]
    for (const val of arrValues) {
      for (const suite of arrSuites) {
        this.cards.push(new Card({ value: val, suite: suite }));
      }
    }
    // this works too
    // for (let i = 0; i < arrSuites.length; i++) {
    //   for (let j = 0; j < arrValues.length; j++) {
    //     this.cards.push(new Card({ value: arrValues[j], suite: arrSuites[i] }));
    //   }
    // }

    return this.cards;
  };

  const testDeck = new Deck();

  console.log(testDeck.buildDeck(cardValues, cardSuites));

  // Using sort
  Deck.prototype.shuffle = function (arr) {
    return arr.sort(() => Math.random() - 0.5);
  };

  console.log(testDeck.shuffle(testDeck.cards));
  console.log(testDeck);

  function Player({ cards = [] } = {}) {
    this.cards = cards;
  }
  function Game() {}
})();
