/**** Dependencies ****/
var mongoose = require("mongoose");

/**
 * validateDeckId
 *
 * @param {string} deckId - The database document id of the deck
 * @returns {ValidationObject}
 */
module.exports.validateDeckId = function(deckId) {
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
module.exports.validateDeckName = function(name) {
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
module.exports.validateDeckFields = function(fields) {
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
 * A validation object
 * @typedef {Object} ValidationObject
 * @property {boolean} isValid - Variable to determine is valid or not
 * @property {string} message - Explanation of error
 */