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
    // console.log(pulledCardArr);
    // console.log(this.hand); // works as expected, can delete

    pulledCardArr.push(this.hand.shift()); // or unshift() ...

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

  Game.prototype.isMatch = function (card1, card2) {
    while (card1.value === card2.value) {
      console.log("is firing");
      for (let i = 0; i < 3; i++) {
        setTimeout(this.player1.pullCard, 3000);
        setTimeout(this.player2.pullCard, 3000);
      }
      if (card1.value !== card2.value) {
        break;
      }
    }
  };

  Game.prototype.findWinner = function (player1, player2) {
    let winner = false;
    if (player1.hand.length === 0) {
      winner = player2;
      alert("You win !");
    } else {
      winner = player1;
      alert("CPU wins");
    }
    return winner;
  };

  let pulledCards = [];

  const testGame = new Game(); // creates a game with 2 players who have empty hands- let's fix that !
  //   console.log(testGame.player1, testGame.player2);
  testGame.deck.shuffle(); //UNCOMMENT IN LOGIC
  testGame.deal();
  console.log(testGame.player1, testGame.player2);

  // THE REAL MAIN.JS CONTENT:
  // Sets up players and foundation for choosing players in future iterations of the game
  const CPU = testGame.player1;
  const player = testGame.player2;
  // While neither player has 0 cards, keep playing
  while (CPU.hand.length > 0 || player.hand.length > 0) {
    let cardCPU = CPU.pullCard(pulledCards);
    let cardPlayer = player.pullCard(pulledCards);

    console.table("CPU pulled", cardCPU);
    console.table("Player pulled", cardPlayer);

    console.table("CPU hand", CPU.hand);
    console.table("Player hand", player.hand);

    testGame.isMatch(cardCPU, cardPlayer);

    if (testGame.findWinner(CPU, player)) {
      console.log("this fires");
      break;
    }
  }

  //   console.log("CPU pulled", cardCPU);
  //   console.log("Player pulled", cardPlayer);

  // console.log("should return a Card", testPlayer.pullCard(pulledCards));
  // console.log("Should return an array with 1 card", pulledCards);

  //   const testGame = Game();
})();
