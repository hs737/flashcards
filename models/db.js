/**
 * db.js
 *
 * Initializes database connection
 *
 * Created by hs737 on 12/9/15.
 */

/** Dependencies **/
var mongoose = require('mongoose');

/** Global Variables **/
var dbURI = 'mongodb://localhost/flashcards';

/** Main **/
var db = mongoose.connect(dbURI);

/** Event Handlers **/
mongoose.connection.on('connected', function () {
    console.log('Mongoose> connected: ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose> error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose> disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose> SIGINT - terminating...');
        process.exit(0);
    });
});

module.exports = db;