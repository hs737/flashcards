/**
 * test_model.js
 *
 * Unit testing MongoDB collections
 *
 * Created by hs737 on 12/9/15.
 */

/** Requires **/
const mongoose = require("mongoose");
const mockgoose = require("mockgoose");
const async = require("async");
const should = require("chai").should();
require("../models/deck");
require("../models/card");

const Deck = mongoose.model("Deck");
const Card = mongoose.model("Card");
const mockData = require("./data/mock_data.js");
const deckData = mockData.deckData;
const cardData = mockData.cardData;

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

    describe("Creating a deck", function() {
        var deckName;
        var fieldNames;

        beforeEach(function () {
            deckName = 'Test Deck 3';
            fieldNames = ['coli', 'colii', 'coliii'];
        });

        it("should create a deck when input is valid", function() {
            Deck.createDeck(deckName, fieldNames, function(err) {
                should.not.exist(err);
                // TODO: This is not a robust test. Test needs improvement.
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

    describe("Deleting a deck", function() {
        it("should delete a deck when input is valid", function() {
            var deckId = deckData[0]._id;
            Deck.deleteDeck(deckId, function(err) {
                should.not.exist(err);
                Deck.find({_id: deckId}, function(err, docs) {
                    should.equal(0, docs.length);
                });
                Deck.find({}, function(err, docs) {
                    should.equal(deckData.length - 1, docs.length);
                });
            });
        });

        it("should refuse a deck id that does not exist in collection", function() {
            // Value "000000000000" is hardcoded under the assumption that mock_data.js starts its ObjectIds at "000000000001"
            var deckId = mongoose.mongo.ObjectID("000000000000");
            Deck.deleteDeck(deckId, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a null deck id", function() {
            var deckId = null;
            Deck.deleteDeck(deckId, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty deck id", function() {
            var deckId = "";
            Deck.deleteDeck(deckId, function(err) {
                should.exist(err);
            });
        });
    })

    describe("Updating a deck", function() {
        var deckName;
        var fieldNames;
        var deckId;

        beforeEach(function () {
            // Value "000000000001" is hardcoded under the assumption that mock_data.js starts its ObjectIds at "000000000001"
            deckId = mongoose.mongo.ObjectID("000000000001");
            deckName = 'Test Deck 3';
            fieldNames = ['coli', 'colii', 'coliii'];
        });

        it("should update a deck when input is valid", function() {
            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.not.exist(err);

                Deck.findById(deckId, function(err, decks) {
                    should.not.exist(err);
                    should.equal(1, decks.length);

                    var dbDeck = decks[0];
                    should.equal(dbDeck.name, deckName);
                    for (var j = 0, flen = dbDeck.fields.length; i < flen; i++) {
                        should.equal(dbDeck.fields[j], fieldNames[j]);
                    }
                });
            });

        });

        it("should refuse a deck id that does not exist in collection", function() {
            // Value "000000000000" is hardcoded under the assumption that mock_data.js starts its ObjectIds at "000000000001"
            var deckId = mongoose.mongo.ObjectID("000000000000");

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a null deck id", function() {
            var deckId = null;

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty deck id", function() {
            var deckId = "";

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a null deck name", function() {
            deckName = null;

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty deck name", function() {
            deckName = "";

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a non-string array passed in for a field array", function() {
            fieldNames = null;

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse a null field", function() {
            fieldNames[0] = null;

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });

        it("should refuse an empty field", function() {
            fieldNames[0] = "";

            Deck.updateDeck(deckId, deckName, fieldNames, function(err) {
                should.exist(err);
            });
        });
    });

    describe("Getting all/any decks", function() {
        it("should get all decks", function () {
            Deck.getAllDecks(function (err, decks) {
                should.exist(decks);
                should.equal(decks.length, deckData.length);

                for (var i = 0, len = deckData.length; i < len; i++) {
                    var dbDeck = decks[i];
                    var jsonDeck = deckData[i];

                    should.equal(dbDeck.name, jsonDeck.name);
                    for (var j = 0, flen = dbDeck.fields.length; i < flen; i++) {
                        should.equal(dbDeck.fields[j], jsonDeck.fields[j]);
                    }
                }
            });
        });
    });
});

describe("Cards", function() {

    beforeEach(function(done) {
        async.series([
            function(callback) {
                resetCollection(Card);
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

    describe("Getting a deck", function() {
        it("should get a deck and its contents", function() {

        });
    })

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