/** Dependencies **/
const mongoose = require('mongoose');

/** Module Variables **/
const deckSchema = new mongoose.Schema({
    name: String,
    fields: [String]
});


/** Static Methods **/
deckSchema.statics = {
    /**
     * getAllDecks
     *
     * @param {documentCallback} callback - The callback function to return the retreived decks
     */
    getAllDecks: function(callback) {
        this.find({}, function(err, docs) {
            console.log(docs);
            callback(err, docs);
        });
    },

    /**
     * createDeck
     *
     * @param {string} name - The name of the newly created deck
     * @param {string[]} fields - The list of fields in this specific deck
     * @param {errorCallback} callback - The callback function to return the retreived decks
     */
    createDeck: function(name, fields, callback) {
        if (name == null) {
            callback(new Error("Deck name is null"));
            return;
        }
        if (name.length == 0) {
            callback(new Error("Deck name is empty"));
            return;
        }
        if (fields == null) {
            callback(new Error("Fields is null"));
            return;
        }
        if (fields.reduce(function(prev, curr) {
                return (prev && curr);
            }, new Object()) == null) {
            callback(new Error("A field passed in the field array is null"));
            return;
        }
        if (fields.reduce(function(prev, curr) {
                return (prev || (curr.length == 0));
            }, false)) {
            callback(new Error("A field passed in the field array is empty"));
            return;
        }

        var deckDocument = new Deck({
            name: name,
            fields: fields
        });
        deckDocument.save(callback);
    },

    /**
     * deleteDeck
     *
     * @param {string} deckId - The database document id of the deck that will be deleted
     * @param {errorCallback} callback - The callback function to return the retreived decks
     */
    deleteDeck: function (deckId, callback) {

    }
};

/** Instance Methods **/


var Deck = mongoose.model("Deck", deckSchema, "decks");

/**** Global JSDoc Documentation ****/
/**
 * An object representing a deck of flash cards
 * @typedef {Object} Deck
 * @property {string} name - Name of deck
 * @property {string[]} fields - Fields of a deck
 */
/**
 * An error object
 * @typedef {Object} Error
 * @property {string} name - Name of error
 * @property {string} message - Explanation of error
 */
/**
 * Global callback is displayed as a global member.
 * @callback documentCallback
 * @param {Deck[]} decks
 */
/**
 * Global callbacks that just check for error.
 * @callback errorCallback
 * @param {Error} err
 */