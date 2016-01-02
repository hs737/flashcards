/**
 * test_model_deck.js
 *
 * Unit testing MongoDB collection: Card
 *
 * Created by hs737 on 12/9/15.
 */

/**** Dependencies ****/
const mongoose = require("mongoose");
const mockgoose = require("mockgoose");
const async = require("async");
const should = require("chai").should();
const utility = require('./test_utility_model');
require("../models/deck");
require("../models/card");

/**** Module Variables ****/
const Deck = mongoose.model("Deck");
const Card = mongoose.model("Card");
const mockData = require("./data/mock_data.js");
const deckData = mockData.deckData;
const cardData = mockData.cardData;

/**** Mock the database ****/
mockgoose(mongoose);
DB = require('../models/db');

/**** Global Variables ****/
process.env.NODE_ENV = 'test';

/**** Main ****/
describe("Cards", function() {

    beforeEach(function(done) {
        async.series([
            function(callback) {
                utility.resetCollection(Card);
                utility.resetCollection(Deck);
                callback();
            },
            function(callback) {
                utility.loadData(Deck, deckData);
                callback();
            }
        ]);
        done();
    });

    describe("Getting a deck", function() {
        var deckId = undefined;
        var cardsForSpecificDeck = [];

        before(function() {
            deckId = deckData[0]._id;
            for (var i = 0, len = cardData.length; i < len; i++) {
                if (cardData[i].deck_id.equals(deckId)) {
                    cardsForSpecificDeck.push(cardData[i]);
                }
            }
        });

        it("should get all cards for a deck, if the deck ID is valid", function() {
            Card.getCardsByDeckId(deckId, function(err, cards) {
                should.not.exist(err);
                should.exist(cards);

                should.equal(cards.length, cardsForSpecificDeck.length);

                // Assumption: order of arrays is same. This is not guaranteed
                for (var i = 0, len = cards.length; i < len; i++) {
                    var dbCard = cards[i];
                    var jsonCard = cardsForSpecificDeck[i];

                    should.equal(dbCard.deck_id, jsonCard._id);

                    // Assumption: order of arrays is same. This is not guaranteed
                    for (var j = 0, flen = dbDeck.fields.length; j < flen; j++) {
                        should.equal(dbCard.fields[j].name, jsonCard.fields[j].name);
                        should.equal(dbCard.fields[j].value, jsonCard.fields[j].value);
                    }
                }
            });
        });
    });

//    it("adds a card to a deck", function() {
//
//    });
//
//    it("removes a card from a deck", function() {
//
//    });
//
//    it("edits a card in a deck", function() {
//
//    });
});
