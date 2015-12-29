/**** Dependencies ****/
const mongoose = require('mongoose');

/**** Module Variables ****/
const deckSchema = new mongoose.Schema({
    name: String,
    fields: [String]
});

/**** Schema Static Methods ****/
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
        var deckNameValidation = validateDeckName(name);
        if (!deckNameValidation.isValid) {
            callback(new Error(deckNameValidation.message));
            return;
        }
        var deckFieldsValidation = validateDeckFields(fields);
        if (!deckFieldsValidation.isValid) {
            callback(new Error(deckFieldsValidation.message));
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
        var deckIdValidation = validateDeckId(deckId);
        if (!deckIdValidation.isValid) {
            callback(new Error(deckIdValidation.message));
            return;
        }

        Deck.remove({_id: deckId}, function(err) {
            callback(err);
        });
    },

    /**
     * updateDeck
     *
     * @param {string} deckId - The database document id of the deck that will be deleted
     * @param {string} name - The name of the newly created deck
     * @param {string[]} fields - The list of fields in this specific deck
     * @param {errorCallback} callback - The callback function to return the retreived decks
     */
    updateDeck: function (deckId, name, fields, callback) {
        var deckIdValidation = validateDeckId(deckId);
        if (!deckIdValidation.isValid) {
            callback(new Error(deckIdValidation.message));
            return;
        }
        var deckNameValidation = validateDeckName(name);
        if (!deckNameValidation.isValid) {
            callback(new Error(deckNameValidation.message));
            return;
        }
        var deckFieldsValidation = validateDeckFields(fields);
        if (!deckFieldsValidation.isValid) {
            callback(new Error(deckFieldsValidation.message));
            return;
        }

        //Deck.remove({_id: deckId}, function(err) {
        //    callback(err);
        //});
    }
};

/**** Schema Instance Methods ****/


/**** Mongoose Model ****/
var Deck = mongoose.model("Deck", deckSchema, "decks");

/** Helper Methods **/

/**
 * validateDeckId
 *
 * @param {string} deckId - The database document id of the deck
 * @returns {ValidationObject}
 */
function validateDeckId(deckId) {
    var result = {
        isValid: true,
        message: undefined
    };

    if (deckId == null || !mongoose.Types.ObjectId.isValid(deckId.toString())) {
        result.isValid = false;
        result.message = "Invalid object id '" + deckId + "'";
    }

    return result;
}

/**
 * validateDeckName
 *
 * @param {string} name - The name of the newly created deck
 * @returns {ValidationObject}
 */
function validateDeckName(name) {
    var result = {
        isValid: true,
        message: undefined
    };

    if (name == null) {
        result.isValid = false;
        result.message = "Deck name is null";
    } else if (name.length == 0) {
        result.isValid = false;
        result.message = "Deck name is empty";
    }

    return result;
}

/**
 * validateDeckFields
 *
 * @param {string[]} fields - The list of fields in this specific deck
 * @returns {ValidationObject}
 */
function validateDeckFields(fields) {
    var result = {
        isValid: true,
        message: undefined
    };

    if (fields == null) {
        result.isValid = false;
        result.message = "Fields name is null";
    } else if (fields.reduce(function(prev, curr) {
            return (prev && curr);
        }, new Object()) == null) {
        result.isValid = false;
        result.message = "A field passed in the field array is null";
    } else if (fields.reduce(function(prev, curr) {
            return (prev || (curr.length == 0));
        }, false)) {
        result.isValid = false;
        result.message = "A field passed in the field array is empty";
    }

    return result;
}

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
 * A validation object
 * @typedef {Object} ValidationObject
 * @property {boolean} isValid - Variable to determine is valid or not
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