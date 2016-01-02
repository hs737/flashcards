/**** Dependencies ****/
var mongoose = require("mongoose");

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