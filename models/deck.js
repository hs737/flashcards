/** Dependencies **/
var mongoose = require('mongoose');

/** Global Variables **/
var Schema = mongoose.Schema;
var deckSchema = new Schema({
    name: String,
    fields: [String]
});
var Deck = mongoose.model("Deck", deckSchema, "decks");

/** Main **/
model.exports = {
    schema: deckSchema,
    model: Deck
};