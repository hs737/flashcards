var mongoose = require('mongoose');

var exports = module.exports = {};

exports.deckData = [
    {"_id": mongoose.mongo.ObjectID("000000000001"), "name" : "Test Deck 1", "fields" : ["col1","col2","col3"]},
    {"_id": mongoose.mongo.ObjectID("000000000002"), "name" : "Test Deck 2", "fields" : ["cola","colb","colc"]}
    //{"name" : "Test Deck 1", "fields" : ["col1","col2","col3"]},
    //{"name" : "Test Deck 2", "fields" : ["cola","colb","colc"]}
];

exports.cardData = [
    {"_id": mongoose.mongo.ObjectID("000000001001"), "deck_id": mongoose.mongo.ObjectID("000000000001"),
        "fields": [{"name": "col1", "value": 10}, {"name": "col2", "value": 100}, {"name": "col3", "value": 1000}]},
    {"_id": mongoose.mongo.ObjectID("000000001002"), "deck_id": mongoose.mongo.ObjectID("000000000001"),
        "fields": [{"name": "col1", "value": 20}, {"name": "col2", "value": 200}, {"name": "col3", "value": 2000}]},
    {"_id": mongoose.mongo.ObjectID("000000003001"), "deck_id": mongoose.mongo.ObjectID("000000000001"),
        "fields": [{"name": "col1", "value": 30}, {"name": "col2", "value": 300}, {"name": "col3", "value": 3000}]},
    {"_id": mongoose.mongo.ObjectID("000000002001"), "deck_id": mongoose.mongo.ObjectID("000000000002"),
        "fields": [{"name": "cola", "value": "a"}, {"name": "colb", "value": "aa"}, {"name": "colc", "value": "aaa"}]},
    {"_id": mongoose.mongo.ObjectID("000000002002"), "deck_id": mongoose.mongo.ObjectID("000000000002"),
        "fields": [{"name": "cola", "value": "b"}, {"name": "colb", "value": "bb"}, {"name": "colc", "value": "bbb"}]},
    {"_id": mongoose.mongo.ObjectID("000000002003"), "deck_id": mongoose.mongo.ObjectID("000000000002"),
        "fields": [{"name": "cola", "value": "c"}, {"name": "colb", "value": "cc"}, {"name": "colc", "value": "ccc"}]}
];