'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700; /*this is my server port*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bierwelt')
			.then(()=>{
				console.log("database conexion successfully stablished...");

				//Creacion del servidor
				app.listen(port, () => {
					console.log('servidor corriendo correctamente en la url:localhost:3700');
				});


			})
			.catch(err => console.log(err));

