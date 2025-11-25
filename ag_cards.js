"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Tutorial Case

   Author: Nikita Baiborodov
   Date:   11/23/2025

   Filename: ag_cards.js


   Custom Object Classes
   
   pokerGame
      The pokerGame object contains properties and methods for the game
      of draw poker

   pokerDeck
      The pokerDeck object contains an array of poker cards and methods
      for shuffling and drawing cards from the deck.

   pokerHand
      The pokerHand object contains an array of poker cards drawn from a
      poker deck. The methods associated with the object include the ability 
      to calculate the value of the hand and to mark cards to be discarded,
      replaced with new cards from a poker deck.

   pokerCard
      The pokerCard object contains properties and methods associated with
      individual poker cards including the card rank, suit, and value.
   
	
*/

/*   The pokerGame Object   */
var pokerGame = {
    currentBank: null,
    currentBet: null,

    placeBet: function() {
        this.currentBank -= this.currentBet;
        return this.currentBank;
    }

};

/* Constructor function for poker cards */
function pokerCard(cardSuit, cardRank) {
    this.suit = cardSuit;
    this.rank = cardRank;
    this.rankValue = null;
}

/* Method to reference the image source file for a card */
pokerCard.prototype.cardImage = function() {
    var suitAbbr = this.suit.substring(0, 1).toLowerCase();
    return suitAbbr + this.rankValue + ".png";
};

/* Method to replace a card with a one from the deck */
pokerCard.prototype.replaceFromDeck = function(pokerDeck) {
    this.suit = pokerDeck.cards[0].suit;
    this.rank = pokerDeck.cards[0].rank;
    this.rankValue = pokerDeck.cards[0].rankValue;
    pokerDeck.cards.shift();
};


/* Constructor function for poker decks */
function pokerDeck() {
    this.cards = new Array(52);

    var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    var ranks = ["2", "3", "4", "5", "6",
        "7", "8", "9", "10",
        "Jack", "Queen", "King", "Ace"];

    var cardCount = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
            this.cards[cardCount] = new pokerCard(suits[i], ranks[j]);
            this.cards[cardCount].rankValue = j + 2;
            cardCount++;
        }
    }

    // Method to randomly sort the deck
    this.shuffle = function() {
        this.cards.sort(function() {
            return 0.5 - Math.random();
        });
    };

    // Method to deal cards from the deck into a poker hand
    this.dealTo = function(pokerHand) {
        for (var i = 0; i < pokerHand.cards.length; i++) {
            pokerHand.cards[i] = this.cards.shift();
        }
    };


}

/* Constructor function for poker hands */
function pokerHand(handLength) {
    this.cards = new Array(handLength);
}

