/** Dependencies **/
var mongoose = require("mongoose");

/** Global Variables **/
var Schema = mongoose.Schema;
var fieldSchema = new Schema({
    name: String,
    value: Schema.Types.Mixed
});
var cardSchema = new Schema({
    deck_id: Schema.Types.ObjectId,
    fields: [fieldSchema]
});
var Card = mongoose.model("Card", cardSchema, "cards");

/** Main **/
module.exports = Card;