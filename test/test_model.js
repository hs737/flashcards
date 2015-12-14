/**
 * test_deck.js
 *
 * Unit testing MongoDB collection 'Deck'
 *
 * Created by hs737 on 12/9/15.
 */

/** Dependencies **/
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");

/** Mock the database **/
mockgoose(mongoose);
//var db = require('../models/db');
//var Deck = require("../models/deck");

/** Global Variables **/
process.env.NODE_ENV = 'test';

/** Main **/


describe("Deck", function() {
    beforeEach(function(done) {
        // runs before each test in this block
         mockgoose.reset(); // TODO: Call does not seem to work for a single collection
        //console.log(mongoose.collections);
        done();
    });

    afterEach(function(done) {
        // runs after each test in this block
        // Reset the database after every test.
        //mockgoose.reset();
        done();
    });

    describe("Creation", function() {
        it("creates a deck when input is valid", function() {

        });

        it("does not create a deck when input is invalid", function() {

        });
    })

    describe("Deletion", function() {
        it("deletes a deck when input is valid", function() {

        });

        it("does not delete a deck when input is invalid", function() {

        });
    })

    it("edits a deck", function() {

    });

    it("gets all decks", function() {

    });
});

describe("Cards", function() {
    it("gets a deck and its contents", function() {

    });

    it("adds a card to a deck", function() {

    });

    it("removes a card from a deck", function() {

    });

    it("edits a card in a deck", function() {

    });
});