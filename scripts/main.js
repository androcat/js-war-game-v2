(function () {
  "use strict";

  const cpuCardText = document.getElementById("computer-card-text");
  const cpuCardHand = document.getElementById("computer-hand");

  const playerCardText = document.getElementById("player-card-text");
  const playerCardHand = document.getElementById("player-hand");

  const pullCardBtn = document.getElementById("pull-card-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  // Array of card values and suites
  const cardValues = [
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
    "Ace",
  ];

  const cardSuites = ["♣", "♦", "♥", "♠"];

  // constructor for Game, Player, Deck, and Card
  function Card({ value = "", suite = "" } = {}) {
    this.value = value;
    this.suite = suite;
  }

  Card.prototype.print = function () {
    return `${this.value} of ${this.suite}`;
  };

  function Deck() {
    this.cards = []; // needs to have 52 card objs

    for (const val of cardValues) {
      for (const suite of cardSuites) {
        this.cards.push(new Card({ value: val, suite: suite }));
      }
    }
  }

  // Using sort
  Deck.prototype.shuffle = function () {
    return this.cards.sort(() => Math.random() - 0.5);
  };

  function Player() {
    this.hand = [];
  }

  Player.prototype.shuffle = function () {
    return this.hand.sort(() => Math.random() - 0.5);
  };

  // Successfully pulls top card
  /// put on game instead bc it will be keeping track of the cards vvv
  Player.prototype.pullCard = function (pulledCardArr) {
    // console.log(pulledCardArr);
    // console.log(this.hand); // works as expected, can delete

    pulledCardArr.unshift(this.hand.shift()); // shift() removes 1st card and gives it onto the 'top'/start of pulledCardArr
    //IF A HAND IS EMPTY AND WE ARE IN THE LAST PART OF THE GAME, COULD BE UNSHIFTING IN UNDEFINED
    return pulledCardArr[0]; //gives back card just added
  };

  function Game() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.deck = new Deck();
    this.pulledCardArr = [];
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

  Game.prototype.draw = function () {
    let cardCPU = this.player1.pullCard(this.pulledCardArr);
    let cardPlayer = this.player2.pullCard(this.pulledCardArr);

    console.table("CPU pulled", cardCPU);
    console.table("Player pulled", cardPlayer);
    cpuCardText.innerText = cardCPU.print();
    playerCardText.innerText = cardPlayer.print();

    console.table("CPU hand", CPU.hand);
    console.table("Player hand", player.hand);
    cpuCardHand.innerText = this.player1.hand.length;
    playerCardHand.innerText = this.player2.hand.length;

    // this.pulledCardArr = [cardCPU, cardPlayer, ...this.pulledCardArr];
    this.isMatch(cardCPU, cardPlayer);
  };

  Game.prototype.isMatch = function (card1, card2) {
    console.log("");
    if (card1.value === card2.value) {
      // REFACTOR
      cpuCardText.innerText = "WAR!";
      playerCardText.innerText = "WAR!";
      this.pulledCardArr = [
        ...this.player1.hand.splice(0, 3), // Grabbing the first 3 of the players' hands to add to pot
        ...this.player2.hand.splice(0, 3),
        ...this.pulledCardArr,
      ];
      console.log("Pot after war", this.pulledCardArr);
      setTimeout(() => {
        cpuCardText.innerText = "Shuffle";
        playerCardText.innerText = "Shuffle";
        this.player1.shuffle();
        this.player2.shuffle();
      }, 1000);
    } else if (
      cardValues.indexOf(card1.value) > cardValues.indexOf(card2.value)
    ) {
      console.log("CPU wins Round");
      console.log("Pot", this.pulledCardArr);
      console.log("CPU hand", this.player1.hand);
      console.log("Player hand", this.player2.hand);
      this.player1.hand = [...this.player1.hand, ...this.pulledCardArr];
      this.pulledCardArr = [];
      console.table("Player 1 should have the pot now", this.player1.hand);
    } else if (
      cardValues.indexOf(card1.value) < cardValues.indexOf(card2.value)
    ) {
      console.log("Player wins Round");
      console.log("Pot", this.pulledCardArr);
      console.log("CPU hand", this.player1.hand);
      console.log("Player hand", this.player2.hand);
      this.player2.hand = [...this.player2.hand, ...this.pulledCardArr];
      this.pulledCardArr = [];
      console.table("Player 2 should have the pot now", this.player2.hand);
    }

    if (this.player1.hand.length === 0) {
      alert("You win !");
      playerCardText.innerText = "Winner!";
      cpuCardText.innerText = "Loser :^(";
      cpuCardHand.innerText = "0";
      playerCardHand.innerText = "52";
    } else if (this.player2.hand.length === 0) {
      alert("CPU wins!");
      playerCardText.innerText = "Loser :^(";
      cpuCardText.innerText = "Winner!";
      cpuCardHand.innerText = "52";
      playerCardHand.innerText = "0";
    }
    cpuCardHand.innerText = this.player1.hand.length;
    playerCardHand.innerText = this.player2.hand.length;
  };

  Game.prototype.play = function () {
    let cardCPU = CPU.pullCard(pulledCards);
    let cardPlayer = player.pullCard(pulledCards);

    testGame.isMatch(cardCPU, cardPlayer);
  };

  alert(
    "Welcome to a game of War! Some things to note: Every time war happens, the hands will automatically shuffle. If the drawn pile is going back and forth too much, you can hit the 'Shuffle both Hands' button anytime you'd like."
  );
  let pulledCards = [];

  const testGame = new Game();
  testGame.deck.shuffle();
  testGame.deal();
  console.log(testGame.player1, testGame.player2);

  const CPU = testGame.player1;
  const player = testGame.player2;

  cpuCardText.innerText = CPU.hand[0].print();
  playerCardText.innerText = player.hand[0].print();
  // let i = 50;
  // while (CPU.hand.length > 0 && player.hand.length > 0 && i) {
  //   testGame.draw();
  //   i--;
  // }

  pullCardBtn.addEventListener("click", () => testGame.draw());
  shuffleBtn.addEventListener("click", () => {
    CPU.shuffle();
    player.shuffle();
    cpuCardText.innerText = CPU.hand[0].print();
    playerCardText.innerText = player.hand[0].print();
  });
})();
