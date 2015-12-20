/** Dependencies **/
var mongoose = require('mongoose');

/** Module Variables **/
var deckSchema = new mongoose.Schema({
    name: String,
    fields: [String]
});

/** Static Methods **/
deckSchema.statics.getAllDecks = function(err, callback) {
    var result = [1];
    callback(err, result);
}

/** Instance Methods **/


var Deck = mongoose.model("Deck", deckSchema, "decks");
module.exports = {
    schema: deckSchema,
    model: Deck
};