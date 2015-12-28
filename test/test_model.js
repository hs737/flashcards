/**
 * test_deck.js
 *
 * Unit testing MongoDB collection 'Deck'
 *
 * Created by hs737 on 12/9/15.
 */

/** Requires **/
const mongoose = require("mongoose");
const mockgoose = require("mockgoose");
const async = require("async");
const should = require("chai").should();
require("../models/deck");

const Deck = mongoose.model("Deck");
const deckData = require("./data/data_deck.js");

/** Mock the database **/
mockgoose(mongoose);
DB = require('../models/db');

/** Global Variables **/
process.env.NODE_ENV = 'test';

/** Main **/
describe("Deck", function() {

    beforeEach(function(done) {
        async.series([
            function(callback) {
                resetCollection(Deck);
                callback();
            },
            function(callback) {
                loadData(Deck, deckData);
                callback();
            }
        ]);
        done();
    });

    describe("Creation", function() {
        var deckName;
        var fieldNames;

        beforeEach(function () {
            deckName = 'Test Deck 3';
            fieldNames = ['coli', 'colii', 'coliii'];
        });

        it("should create a deck when input is valid", function() {
            Deck.createDeck(deckName, fieldNames, function(err) {
                should.not.exist(err);
            });
        });

        it("should refuse a null deck name", function() {
            deckName = null;

            Deck.createDeck(deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty deck name", function() {
            deckName = "";

            Deck.createDeck(deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a non-string array passed in for a field array", function() {
            fieldNames = null;

            Deck.createDeck(deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a null field", function() {
            fieldNames[0] = null;

            Deck.createDeck(deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty field", function() {
            fieldNames[0] = "";

            Deck.createDeck(deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });
    })

    describe("Deletion", function() {
        it("should delete a deck when input is valid", function() {
            var deckId = deckData[0]._id;
            Deck.deleteDeck(deckName, fieldNames, function(err) {
                should.not.exist(err);

            });

        });

        it("should refuse a null deck id", function() {

        });

        it("should refuse an invalid deck id", function() {

        });
    })

    //it("edits a deck", function() {
    //
    //});

    it("gets all decks", function() {
        Deck.getAllDecks(function(err, decks) {
            should.exist(decks);
            should.equal(decks.length, deckData.length);

            for (var i = 0, len = deckData.length; i < len; i++) {
                var dbDeck = decks[i];
                var jsonDeck = deckData[i];

                should.equal(dbDeck.name, jsonDeck.name);
                for (var j = 0, flen = dbDeck.fields.length; i < flen; i++) {
                    should.equal(dbDeck.fields[j], jsonDeck.fields[j].name);
                }
            }
        });
    });
});

//describe("Cards", function() {
//    it("gets a deck and its contents", function() {
//
//    });
//
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
//});

/** Helper **/
function resetCollection(collection) {
    async.series([
        function(callback) {
            collection.remove({}, function(err) {
                console.log(err);
                callback(err);
            });
        },
        function(callback) {
            collection.find({}, function(err, docs) {
                assert.equal(0, docs.length)
                callback(err);
            });
        }
    ]);
}

function loadData(collection, data) {
    collection.create(data, function(err, records) {
        if (err) {
            console.log(err);
        }
        console.log(records);
    });
}