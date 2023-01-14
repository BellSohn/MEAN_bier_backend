	'use strict'

var Bier = require('../models/bier');
var fs = require('fs');
var path = require('path'); /*this module allow me to load phisic routes*/

var controller = {

	home:function(req,res){
		return res.status(200).send({
			message:'soy la home'
		});
	},

	test:function(req,res){
		return res.status(200).send({
			message:'soy el Test'
		});
	},

	saveBier:function(req,res){

		var bier = new Bier();

		var params = req.body;

		bier.name = params.name;
		bier.country = params.country;
		bier.description = params.description;
		bier.category = params.category;
		bier.ingredients = params.ingredients;
		bier.foundation = params.foundation;
		bier.image = null

		bier.save((err,bierStored)=>{
			if(err) return res.status(500).send({message:"Error al guardar documento"});
			if(!bierStored) return res.status(404).send({message:"No se pudo guardar el documento"});

			return res.status(200).send({bier:bierStored});
		});		

	},

	getBier:function(req,res){

		var  bierId = req.params.id;

		if(bierId == null) return res.status(404).send({message:'id de cerveza no existe'});

		Bier.findById(bierId,(err,bier) => {
			if(err) return res.status(500).send({message:"Error al devolver los datos"});
			if(!bier) return res.status(404).send({message:"la cerveza no existe"});

			return res.status(200).send({
				bier
			});
		});
	},

	getBiers:function(req,res){
		
		/*with find we can include search criteria.if left blank return all mongo data.We can use also find({}).sort('year') */
		
		Bier.find({}).exec((err,biers)=>{
			if(err) return res.status(500).send({message:'error al devolver los datos'});

			if(!biers) return err.status(404).send({message:'No hay cervezas para mostrar'});

			return res.status(200).send({biers});
			
		});
	},

	updateBier:function(req,res){

		var bierId = req.params.id;
		var update = req.body; /*este es el objeto completo,con los datos ya actualizados*/

		Bier.findByIdAndUpdate(bierId,update,{new:true},(err,bierUpdated)=>{
				if(err) return res.status(500).send({message:'Error al actualizar'});

				if(!bierUpdated) return res.status(404).send({message:'No existe el proyecto a actualizar'});

				return res.status(200).send({
					bier:bierUpdated

				});
		});

	},

	daleteBier:function(req,res){

		var bierid = req.params.id;

		Bier.findByIdAndRemove(bierid,(err,bierRemoved)=>{

		if(err) return res.status(500).send({message:'No se pudo borrar el registro'});
		if(!bierRemoved) return res.status(404).send({message:'No se puede borrar el registro'});

			return res.status(200).send({
				bier:bierRemoved
			});

		});

	},

	uploadImage:function(req,res){
		var bierId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif'){

				Bier.findByIdAndUpdate(bierId,{image:fileName},{new:true},(err,bierUpdated)=>{

				if(err) return res.status(200).send({message:'La imagen no se ha subido'});
				if(!bierUpdated) return res.status(404).send({message:'El proyecto no existe'});

				return res.status(200).send({
					bier:bierUpdated
			});

		});

	}else{
		fs.unlink(filePath,err =>{
			return res.status(200).send({message:'La extension no es valida'});
		});

	}			
				
	}else{
		return res.status(200).send({
			message:fileName
		});
		}
	},

	getImageFile:function(req, res){	

		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file,(exists)=>{
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message:'the image doesn´t exists...'
				});
			}
		});


	}

};

module.exports = controller;
