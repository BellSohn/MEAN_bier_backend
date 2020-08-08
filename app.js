'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var bier_routes = require('./routes/bier');

//Middlewares

app.use(bodyParser.urlencoded({extended:false})); //configuracion necesaria para bodyParser
app.use(bodyParser.json()); //con esto convertimos cualquier tipo de peticion a JSON

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api',bier_routes);

/*app.get('/test',(req,res) => {
	res.status(200).send({message:"Hi welt from my backend"
});

});

app.get('/',(req,res)=>{
	res.status(200).send("Hola Ceporro");
});

app.post('/datos/:id',(req,res)=>{
	console.log(req.body.nombre);
	console.log(req.query.web);
	console.log(req.params.id);
});*/

//exportar 
module.exports = app;