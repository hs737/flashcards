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
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    getAllDecks: function(err, callback) {
        this.find({}, function(err, docs) {
            console.log(docs);
            callback(err, docs);
        });
    }
};

/** Instance Methods **/


var Deck = mongoose.model("Deck", deckSchema, "decks");
//module.exports = {
//    schema: deckSchema,
//    model: Deck
//};