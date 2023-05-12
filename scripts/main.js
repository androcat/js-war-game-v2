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

  // Using sort
  Deck.prototype.shuffle = function (arr) {
    return arr.sort(() => Math.random() - 0.5);
  };
  //   const copyShuffledCards = testDeck.shuffle(testDeck.cards);
  //   console.log("Copy of shuffled deck", copyShuffledCards);
  //   console.log("Test deck", testDeck);

  // change from Deck obj to [] because we only want half of the array of cards deck has after it has been shuffled
  function Player({ deck = [] } = {}) {
    this.deck = deck;
  }
  // Successfully pulls top card
  Player.prototype.pullCard = function (pulledCardArr) {
    pulledCardArr.push(this.deck.cards.shift());
    return pulledCardArr[0];
  };

  function Game() {
    let pulledCards = [];

    const gameDeck = new Deck();
    gameDeck.buildDeck(cardValues, cardSuites);
    // console.log("Build Deck:", testDeck);

    // How to give player only half of the deck?
    const CPU = new Player({
      deck: gameDeck.cards.slice(0, gameDeck.cards.length / 2),
    }); //our already shuffled deck
    // console.log(testPlayer);
    // console.log(CPU.deck); // works

    // console.log("should return a Card", testPlayer.pullCard(pulledCards));
    // console.log("Should return an array with 1 card", pulledCards);
  }

  const testGame = Game();
})();
