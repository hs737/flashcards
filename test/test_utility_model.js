/**** Dependencies ****/
var mongoose = require("mongoose");
var async = require("async");

module.exports.resetCollection = function (collection) {
    async.series([
        function(callback) {
            collection.remove({}, function(err) {
                console.log(err);
                callback(err);
            });
        },
        function(callback) {
            collection.find({}, function(err, docs) {
                assert.equal(0, docs.length)
                callback(err);
            });
        }
    ]);
}

module.exports.loadData = function (collection, data) {
    collection.create(data, function(err, records) {
        if (err) {
            console.log(err);
        }
        console.log(records);
    });
}