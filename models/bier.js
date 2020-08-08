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
/*moongose, cambia el primer parámetro de model,a 
minuscula y plural, asi que Bier cambia a biers*/



