/**
 * test_deck.js
 *
 * Unit testing MongoDB collection 'Deck'
 *
 * Created by hs737 on 12/9/15.
 */

/** Requires **/
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
var async = require("async");
var should = require("chai").should();

var Deck = require("../models/deck");
var deckData = require("./data/data_deck.json");

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
                resetCollection(Deck.model);
                callback();
            },
            function(callback) {
                loadData(Deck.model, deckData);
                callback();
            }
        ]);
        done();
    });

    describe("Creation", function() {
        it("creates a deck when input is valid", function() {

        });

        //it("does not create a deck when input is invalid", function() {
        //
        //});
    })
    //
    //describe("Deletion", function() {
    //    it("deletes a deck when input is valid", function() {
    //
    //    });
    //
    //    it("does not delete a deck when input is invalid", function() {
    //
    //    });
    //})
    //
    //it("edits a deck", function() {
    //
    //});

    it("gets all decks", function() {
        Deck.model.getAllDecks(null, function(err, decks) {
            should.exist(decks);
            should.equal(decks.length, deckData.length);

            for (var i = 0, len = deckData.length; i < len; i++) {
                should.equal(decks[i].name, deckData[i].name);

                // TODO: Check for equality of fields
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