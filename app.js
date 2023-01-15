'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//load file routes
var bier_routes = require('./routes/bier');

//Middlewares

app.use(bodyParser.urlencoded({extended:false})); //necesary configuration to bodyParser
app.use(bodyParser.json()); //with this,we change any type of request to JSON data

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use('/api',bier_routes);


//export
module.exports = app;
