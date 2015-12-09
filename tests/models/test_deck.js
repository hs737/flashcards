/**
 * test_deck.js
 *
 * Unit testing MongoDB collection 'Deck'
 *
 * Created by hs737 on 12/9/15.
 */

/** Dependencies **/
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");

/** Main **/
mockgoose(mongoose);
require('../../model/db');
var deck = require("./../../models/deck");