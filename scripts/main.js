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

  function Deck() {
    this.cards = []; // needs to have 52 card objs

    for (const val of cardValues) {
      for (const suite of cardSuites) {
        this.cards.push(new Card({ value: val, suite: suite }));
      }
    }
  }
  //   Deck.prototype.buildDeck = function (arrValues, arrSuites) {
  //     // let deck = Array(arrValues.length * arrSuites.length);

  //     // Why does this give only the first letter ???
  //     // A: it was bc i had it like: [val] and [suite]
  //     for (const val of arrValues) {
  //       for (const suite of arrSuites) {
  //         this.cards.push(new Card({ value: val, suite: suite }));
  //       }
  //     }
  //     // this works too
  //     // for (let i = 0; i < arrSuites.length; i++) {
  //     //   for (let j = 0; j < arrValues.length; j++) {
  //     //     this.cards.push(new Card({ value: arrValues[j], suite: arrSuites[i] }));
  //     //   }
  //     // }

  //     return this.cards;
  //   };

  // Using sort
  Deck.prototype.shuffle = function () {
    return this.cards.sort(() => Math.random() - 0.5);
  };
  //   const copyShuffledCards = testDeck.shuffle(testDeck.cards);
  //   console.log("Copy of shuffled deck", copyShuffledCards);
  //   console.log("Test deck", testDeck);

  // change from Deck obj to [] because we only want half of the array of cards deck has after it has been shuffled
  function Player() {
    this.hand = [];
  }
  // Successfully pulls top card
  /// put on game instead bc it will be keeping track of the cards vvv
  Player.prototype.pullCard = function (pulledCardArr) {
    console.log(pulledCardArr);
    console.log(this.hand);

    // the problem child according to the console: TypeError - undefined
    // it was because i was trying to drill down to the deck's card array when what we need is inside of Player's deck
    pulledCardArr.push(this.hand.shift()); // or unshift() ...

    console.log(pulledCardArr);
    return pulledCardArr[pulledCardArr.length - 1]; // and [0]
  };

  function Game() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.deck = new Deck();
  }
  // will pass in 'deck' an array of card objs, preferably pre-shuffled
  Game.prototype.deal = function () {
    for (let i = 0; i < this.deck.cards.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.unshift(this.deck.cards[i]);
      } else {
        this.player2.hand.unshift(this.deck.cards[i]);
      }
    }
  };

  let pulledCards = [];

  //gameDeck.shuffle(); //works

  const testGame = new Game(); // creates a game with 2 players who have empty hands- let's fix that !
  //   console.log(testGame.player1, testGame.player2);
  testGame.deal();
  console.log(testGame.player1, testGame.player2);

  // How to give player only half of the deck?
  //   const CPU = new Player({
  //     hand: gameDeck.cards.slice(0, gameDeck.cards.length / 2),
  //   }); //our already shuffled deck
  //   const player = new Player({
  //     hand: gameDeck.cards.slice(gameDeck.cards.length / 2),
  //   });

  //   console.log(player.hand);

  //   console.table(CPU); // works, gives back half of a shuffled deck
  //   console.table(player);

  // While neither player has 0 cards, keep playing
  //while (CPU.deck.length > 0 && player.deck.length > 0) {

  //   let cardCPU = CPU.pullCard(pulledCards);
  //   let cardPlayer = player.pullCard(pulledCards);
  //   //}
  //   console.log("CPU pulled", cardCPU);
  //   console.log("Player pulled", cardPlayer);

  // console.log("should return a Card", testPlayer.pullCard(pulledCards));
  // console.log("Should return an array with 1 card", pulledCards);

  //   const testGame = Game();
})();
