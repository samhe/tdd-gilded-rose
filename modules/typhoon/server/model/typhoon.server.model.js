'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var TyphoonSchema = new Schema({}, {
  strict: false
});

mongoose.model('typhoon', TyphoonSchema, 'weatherevents');