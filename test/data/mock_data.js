var mongoose = require('mongoose');

var exports = module.exports = {};

exports.deckData = [
    {"_id": mongoose.mongo.ObjectID("000000000001"), "name" : "Test Deck 1", "fields" : ["col1","col2","col3"]},
    {"_id": mongoose.mongo.ObjectID("000000000002"), "name" : "Test Deck 2", "fields" : ["cola","colb","colc"]}
    //{"name" : "Test Deck 1", "fields" : ["col1","col2","col3"]},
    //{"name" : "Test Deck 2", "fields" : ["cola","colb","colc"]}
];

exports.cardData = [

];