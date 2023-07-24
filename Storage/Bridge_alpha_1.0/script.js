const startButton = document.getElementById("startButton");
const suits = ["hearts", "diamonds", "spades", "clubs"];
const values = ["ace", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const player1Hand = document.getElementById("player1Hand");
const player2Hand = document.getElementById("player2Hand");
const table = document.getElementById("playedCards");
const deckCards = document.getElementById("deck");

const deck = [];
let deckCount = 36;
let player1 = [];
let player2 = [];
let playedCards = [];

//removing an existing card image from the table
function adjTable() {
  let playedCardImg = table.querySelector("img");
  table.removeChild(playedCardImg);
}

// Create a new card element
function createCardElement(card) {
  let cardElement = document.createElement("img");
  cardElement.src = `Cards/${card.split(" ").join("_")}.png`;
  cardElement.id = card;
  return cardElement;
}

function pickCard() {
  let newCard = deck[deckCount - 1];
  player1.push(newCard);
  player1Hand.appendChild(createCardElement(newCard));
  deckCount--;
}

function canMoveCard(playedCard, tableCard) {
  const playedCardValue = playedCard.split(" ")[0];
  const playedCardSuit = playedCard.split(" ")[2];
  const tableCardValue = tableCard.split(" ")[0];
  const tableCardSuit = tableCard.split(" ")[2];

  return playedCardValue === tableCardValue || playedCardSuit === tableCardSuit;
}

function updatePlayerHand(playerHand) {
  if (player.length <= 5) {
    playerHand.classList.add("fewCards");
    playerHand.classList.remove("more");
  } else {
    playerHand.classList.add("more");
    playerHand.classList.remove("fewCards");
  }
}

startButton.addEventListener("click", function () {
  // Create a deck of cards
  for (let suit in suits) {
    for (let value in values) {
      deck.push(values[value] + " of " + suits[suit]);
    }
  }

  // Shuffle the deck
  for (let i = 0; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }

  // Deal cards to players
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      player2.push(deck[i]);
      let player2Card = document.createElement("img");
      player2Card.src = "Cards/shirt.png";
      player2Hand.appendChild(player2Card);
      deck.splice(i, 1);
      player2Card.id = deck[i];
      deckCount--;
    } else {
      if (i != 9) {
        player1.push(deck[i]);
        let player1Card = document.createElement("img");
        player1Card.src = "Cards/" + deck[i].split(" ").join("_") + ".png";
        player1Card.id = deck[i];
        player1Hand.appendChild(player1Card);
        deck.splice(i, 1);
      } else if (i == 9) {
        let playedCard = document.createElement("img");
        playedCard.src = "Cards/" + deck[i].split(" ").join("_") + ".png";
        playedCards.push(deck[i]);
        table.appendChild(playedCard);
        deck.splice(i, 1);
      }

      deckCount--;
    }
  }

  console.log("Player 1: " + player1);
  console.log("Player 2: " + player2);

  player1Hand.style.display = "flex";
  player2Hand.style.display = "flex";
  startButton.style.display = "none";
});

player1Hand.addEventListener("click", function (event) {
  if (event.target.id) {
    let tableCard = playedCards[playedCards.length - 1];
    let cardId = event.target.id;
    let card = event.target;

    if (canMoveCard(cardId, tableCard)) {
      adjTable();
      let playedCard = document.createElement("img");
      playedCard.src = event.target.src;
      table.appendChild(playedCard);

      let cardIndex = player1.indexOf(event.target.id);
      playedCards.push(player1[cardIndex]);
      player1.splice(cardIndex, 1);
      player1Hand.removeChild(card);
      updatePlayerHand(player1Hand);
    }

    console.log(playedCards);
  }
});

deckCards.addEventListener("click", pickCard);

player1Hand.style.display = "none";
player2Hand.style.display = "none";
