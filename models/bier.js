'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BierSchema = Schema({
		name:String,
		country:String,
		description:String,
		category:String,
		ingredients:String,
		foundation:Number,
		image:String

});

module.exports = mongoose.model('Bier',BierSchema);
/*moongose change the first parameter of the model to lowercase and plural,so Biers turn into biers*/



