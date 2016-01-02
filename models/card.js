/**** Dependencies ****/
var mongoose = require("mongoose");
const utility = require('./model_utility');

/**** Module Variables ****/
var Schema = mongoose.Schema;
var fieldSchema = new Schema({
    name: String,
    value: Schema.Types.Mixed
});
var cardSchema = new Schema({
    deck_id: Schema.Types.ObjectId,
    fields: [fieldSchema]
});

/**** Schema Static Methods ****/
cardSchema.statics = {
    /**
     * getCardsByDeckId
     *
     * @param {string} deckId -  The database document id of the deck
     * @param {documentCallback} callback - The callback function to return the retreived deck
     */
    getCardsByDeckId: function(deckId, callback) {
        var deckIdValidation = utility.validateDeckId(deckId);
        if (!deckIdValidation.isValid) {
            callback(new Error(deckIdValidation.message));
            return;
        }

        this.find({"deck_id": deckId}, function(err, docs) {
            callback(err, docs);
        })
    }
};

/**** Schema Instance Methods ****/

/**** Mongoose Model ****/
var Card = mongoose.model("Card", cardSchema, "cards");

/** Helper Methods **/

/**** Global JSDoc Documentation ****/
/**
 * An object representing a single flash card
 * @typedef {Object} Field
 * @property {string} name - Name of field
 * @property {*} value - Value of field
 */
/**
 * An object representing a single flash card
 * @typedef {Object} Card
 * @property {string} deckId -  The database document id of the deck that this card belongs to
 * @property {Field[]} fields - Fields of a card
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
 * @param {Card[]} deck
 */
/**
 * Global callbacks that just check for error.
 * @callback errorCallback
 * @param {Error} err
 */